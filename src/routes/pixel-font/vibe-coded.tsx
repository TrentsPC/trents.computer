import { createFileRoute } from "@tanstack/solid-router";
import { createEffect, createSignal } from "solid-js";
// import { useState, useRef, useEffect, useCallback } from "react";

export const Route = createFileRoute("/pixel-font/vibe-coded")({
  component: App,
});

const CHARSET =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
const DW = 7,
  DH = 12;
const cpKey = (cp: any) =>
  `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
const emptyBm = (w: any, h: any) =>
  Array.from({ length: h }, () => Array(w).fill(0));

function makeFont() {
  const glyphs: any = {};
  for (const ch of CHARSET) {
    const cp = ch.codePointAt(0),
      key = cpKey(cp),
      sp = ch === " ";
    glyphs[key] = {
      name: sp ? "space" : ch,
      codePoint: cp,
      advanceWidth: sp ? 5 : 9,
      bearingLeft: 1,
      bearingTop: 10,
      width: sp ? 4 : DW,
      height: DH,
      bitmap: emptyBm(sp ? 4 : DW, DH),
    };
  }
  return {
    meta: {
      version: "1.0",
      name: "Untitled Font",
      author: "",
      description: "",
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    metrics: {
      unitsPerEm: 16,
      ascender: 10,
      descender: -2,
      xHeight: 6,
      capHeight: 8,
      lineGap: 2,
      defaultAdvanceWidth: 9,
    },
    glyphs,
    kerning: {},
    guidelines: [
      { name: "baseline", y: 0, color: "#ef4444" },
      { name: "xHeight", y: 6, color: "#22c55e" },
      { name: "capHeight", y: 8, color: "#3b82f6" },
      { name: "ascender", y: 10, color: "#a855f7" },
    ],
  };
}

// ─── Binary buffer writer ──────────────────────────────────────────────────
function mkBuf() {
  const b: any = [];
  const w = {
    u8: (v: any) => b.push(v & 0xff),
    u16: (v: any) => {
      w.u8(v >> 8);
      w.u8(v);
    },
    i16: (v: any) => w.u16(v < 0 ? v + 0x10000 : v),
    u32: (v: any) => {
      w.u16((v >>> 16) & 0xffff);
      w.u16(v & 0xffff);
    },
    tag: (s: any) => {
      for (let i = 0; i < 4; i++) w.u8(s.charCodeAt(i) || 0x20);
    },
    buf: () => new Uint8Array(b),
    get len() {
      return b.length;
    },
    csum() {
      const d = new Uint8Array(b);
      let s = 0;
      for (let i = 0; i < d.length; i += 4)
        s =
          (s +
            ((d[i] || 0) * 0x1000000 +
              ((d[i + 1] || 0) << 16) +
              ((d[i + 2] || 0) << 8) +
              (d[i + 3] || 0))) >>>
          0;
      return s;
    },
  };
  return w;
}

// ─── TTF/OTF binary builder ────────────────────────────────────────────────
function buildTTF(fontData: any) {
  const UPM = 1000;
  const pixH = fontData.metrics.ascender - fontData.metrics.descender;
  const sc = (v: any) => Math.round((v * UPM) / pixH);

  // Each lit pixel → a clockwise square contour (Y-up math coords)
  function toContours(g: any) {
    const cs = [];
    for (let r = 0; r < g.height; r++)
      for (let c = 0; c < g.width; c++) {
        if (!g.bitmap[r][c]) continue;
        const xL = sc(g.bearingLeft + c),
          xR = sc(g.bearingLeft + c + 1);
        const yT = sc(g.bearingTop - r),
          yB = sc(g.bearingTop - r - 1);
        cs.push([
          { x: xL, y: yB },
          { x: xR, y: yB },
          { x: xR, y: yT },
          { x: xL, y: yT },
        ]);
      }
    return cs;
  }

  function serGlyph(cs: any) {
    if (!cs.length) return null;
    const pts = cs.flat(),
      endPts = [];
    let idx = -1;
    for (const c of cs) {
      idx += c.length;
      endPts.push(idx);
    }
    const xs = pts.map((p: any) => p.x),
      ys = pts.map((p: any) => p.y);
    const xMin = Math.min(...xs),
      xMax = Math.max(...xs),
      yMin = Math.min(...ys),
      yMax = Math.max(...ys);
    const b = mkBuf();
    b.i16(cs.length);
    b.i16(xMin);
    b.i16(yMin);
    b.i16(xMax);
    b.i16(yMax);
    endPts.forEach((e) => b.u16(e));
    b.u16(0); // endPts + no instructions
    pts.forEach(() => b.u8(0x01)); // flags: on-curve, int16 deltas
    let px = 0;
    pts.forEach((p: any) => {
      b.i16(p.x - px);
      px = p.x;
    });
    let py = 0;
    pts.forEach((p: any) => {
      b.i16(p.y - py);
      py = p.y;
    });
    return {
      bytes: b.buf(),
      xMin,
      yMin,
      xMax,
      yMax,
      nC: cs.length,
      nP: pts.length,
    };
  }

  const sorted = Object.values(fontData.glyphs).sort(
    (a: any, b: any) => a.codePoint - b.codePoint,
  );
  const nW = sc(fontData.metrics.defaultAdvanceWidth);
  // .notdef: solid rectangle
  const notdefRec = serGlyph([
    [
      { x: sc(1), y: sc(fontData.metrics.descender) },
      { x: nW - sc(1), y: sc(fontData.metrics.descender) },
      { x: nW - sc(1), y: sc(fontData.metrics.ascender) },
      { x: sc(1), y: sc(fontData.metrics.ascender) },
    ],
  ]);
  const grecs = [
    { cp: -1, rec: notdefRec, advW: nW, lsb: sc(1) },
    ...sorted.map((g: any) => ({
      cp: g.codePoint,
      rec: serGlyph(toContours(g)),
      advW: sc(g.advanceWidth),
      lsb: sc(g.bearingLeft),
    })),
  ];
  const N = grecs.length;

  // glyf + loca (long format)
  const glyfB = mkBuf(),
    loOfs = [];
  for (const gr of grecs) {
    loOfs.push(glyfB.len);
    if (gr.rec) {
      gr.rec.bytes.forEach((v) => glyfB.u8(v));
      if (glyfB.len % 2) glyfB.u8(0);
    }
  }
  loOfs.push(glyfB.len);
  const locaB = mkBuf();
  loOfs.forEach((o) => locaB.u32(o));

  // hmtx
  const hmtxB = mkBuf();
  grecs.forEach((gr) => {
    hmtxB.u16(Math.max(0, gr.advW));
    hmtxB.i16(gr.lsb || 0);
  });

  // cmap — format 4, single segment [32,126] → glyphIndex = cp−31
  // segCount=2: [32,126]+terminator; length=32 bytes
  const cmapB = mkBuf();
  cmapB.u16(0);
  cmapB.u16(1); // version, numTables
  cmapB.u16(3);
  cmapB.u16(1);
  cmapB.u32(12); // Windows Unicode BMP, offset=12
  cmapB.u16(4);
  cmapB.u16(32);
  cmapB.u16(0); // format, length, language
  cmapB.u16(4);
  cmapB.u16(4);
  cmapB.u16(1);
  cmapB.u16(0); // segCountX2, searchRange, entrySelector, rangeShift
  cmapB.u16(126);
  cmapB.u16(0xffff); // endCount
  cmapB.u16(0); // reservedPad
  cmapB.u16(32);
  cmapB.u16(0xffff); // startCount
  cmapB.i16(-31);
  cmapB.i16(1); // idDelta  (cp+(-31) → glyphIndex)
  cmapB.u16(0);
  cmapB.u16(0); // idRangeOffset

  // global bbox
  let gxMin = 0,
    gyMin = sc(fontData.metrics.descender),
    gxMax = nW,
    gyMax = sc(fontData.metrics.ascender);
  for (const gr of grecs)
    if (gr.rec) {
      gxMin = Math.min(gxMin, gr.rec.xMin);
      gyMin = Math.min(gyMin, gr.rec.yMin);
      gxMax = Math.max(gxMax, gr.rec.xMax);
      gyMax = Math.max(gyMax, gr.rec.yMax);
    }

  // head (54 bytes)
  const headB = mkBuf();
  headB.u32(0x00010000);
  headB.u32(0x00010000);
  headB.u32(0);
  headB.u32(0x5f0f3cf5); // checkSumAdjustment(0), magic
  headB.u16(0x000b);
  headB.u16(UPM);
  headB.u32(0);
  headB.u32(0);
  headB.u32(0);
  headB.u32(0); // created+modified (8+8)
  headB.i16(gxMin);
  headB.i16(gyMin);
  headB.i16(gxMax);
  headB.i16(gyMax);
  headB.u16(0);
  headB.u16(8);
  headB.i16(2);
  headB.i16(1);
  headB.i16(0);

  // hhea (36 bytes)
  const maxAW = Math.max(...grecs.map((g) => g.advW));
  const minLSB = Math.min(...grecs.map((g) => g.lsb || 0));
  const hheaB = mkBuf();
  hheaB.u32(0x00010000);
  hheaB.i16(sc(fontData.metrics.ascender));
  hheaB.i16(sc(fontData.metrics.descender));
  hheaB.i16(sc(fontData.metrics.lineGap));
  hheaB.u16(maxAW);
  hheaB.i16(minLSB);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(1);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.i16(0);
  hheaB.u16(N);

  // maxp (32 bytes)
  let maxPts = 0,
    maxCts = 0;
  grecs.forEach((gr) => {
    if (gr.rec) {
      maxPts = Math.max(maxPts, gr.rec.nP);
      maxCts = Math.max(maxCts, gr.rec.nC);
    }
  });
  const maxpB = mkBuf();
  maxpB.u32(0x00010000);
  maxpB.u16(N);
  maxpB.u16(maxPts);
  maxpB.u16(maxCts);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(1);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);
  maxpB.u16(0);

  // OS/2 (96 bytes, version 4)
  const avgW = Math.round(
    grecs.slice(1).reduce((s, g) => s + g.advW, 0) / Math.max(1, N - 1),
  );
  const asc = sc(fontData.metrics.ascender),
    desc = sc(fontData.metrics.descender);
  const xH = sc(fontData.metrics.xHeight),
    capH = sc(fontData.metrics.capHeight);
  const os2B = mkBuf();
  os2B.u16(4);
  os2B.i16(avgW);
  os2B.u16(400);
  os2B.u16(5);
  os2B.u16(0);
  os2B.i16(asc >> 1);
  os2B.i16(asc >> 1);
  os2B.i16(0);
  os2B.i16(-desc >> 2);
  os2B.i16(asc >> 1);
  os2B.i16(asc >> 1);
  os2B.i16(0);
  os2B.i16(asc >> 2);
  os2B.i16(50);
  os2B.i16(xH >> 1);
  os2B.i16(0);
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0].forEach((v) => os2B.u8(v));
  os2B.u32(0x00000003);
  os2B.u32(0);
  os2B.u32(0);
  os2B.u32(0);
  os2B.tag("PYXL");
  os2B.u16(0x0040);
  os2B.u16(32);
  os2B.u16(126);
  os2B.i16(asc);
  os2B.i16(desc);
  os2B.i16(sc(fontData.metrics.lineGap));
  os2B.u16(asc);
  os2B.u16(-desc);
  os2B.u32(0x00000003);
  os2B.u32(0);
  os2B.i16(xH);
  os2B.i16(capH);
  os2B.u16(0);
  os2B.u16(32);
  os2B.u16(2);

  // name
  const fName = fontData.meta.name || "Untitled";
  const psName = (fName.replace(/[^A-Za-z0-9]/g, "") || "Untitled").slice(
    0,
    63,
  );
  const nRecs = [
    { id: 1, s: fName },
    { id: 2, s: "Regular" },
    { id: 3, s: fName + ";1.0" },
    { id: 4, s: fName + " Regular" },
    { id: 6, s: psName + "-Regular" },
  ];
  const enc16 = (s: any) => {
    const b = [];
    for (const c of s) {
      const n = c.charCodeAt(0);
      b.push(n >> 8, n & 0xff);
    }
    return b;
  };
  const nameB = mkBuf(),
    sData = nRecs.map((r) => ({ id: r.id, bytes: enc16(r.s) }));
  nameB.u16(0);
  nameB.u16(sData.length);
  nameB.u16(6 + sData.length * 12);
  let so = 0;
  sData.forEach((s) => {
    nameB.u16(3);
    nameB.u16(1);
    nameB.u16(0x0409);
    nameB.u16(s.id);
    nameB.u16(s.bytes.length);
    nameB.u16(so);
    so += s.bytes.length;
  });
  sData.forEach((s) => s.bytes.forEach((b) => nameB.u8(b)));

  // post v3.0 (32 bytes)
  const postB = mkBuf();
  postB.u32(0x00030000);
  postB.u32(0);
  postB.i16(-sc(1));
  postB.i16(sc(1));
  postB.u32(1);
  postB.u32(0);
  postB.u32(0);
  postB.u32(0);
  postB.u32(0);

  // ─── Assemble ───────────────────────────────────────────────────────────
  const tables: any = {
    "OS/2": os2B,
    cmap: cmapB,
    glyf: glyfB,
    head: headB,
    hhea: hheaB,
    hmtx: hmtxB,
    loca: locaB,
    maxp: maxpB,
    name: nameB,
    post: postB,
  };
  const tNames = Object.keys(tables).sort();
  const nT = tNames.length;
  const lg2 = Math.floor(Math.log2(nT));
  const sr = (1 << lg2) * 16;
  const tOfs: any = {};
  let cur = 12 + nT * 16;
  for (const n of tNames) {
    tOfs[n] = cur;
    cur += tables[n].len;
    if (cur % 4) cur += 4 - (cur % 4);
  }

  const out = new Uint8Array(cur);
  const dv = new DataView(out.buffer);
  let p = 0;
  const W16 = (v: any) => {
    dv.setUint16(p, v, false);
    p += 2;
  };
  const W32 = (v: any) => {
    dv.setUint32(p, v >>> 0, false);
    p += 4;
  };

  // Offset table
  W32(0x00010000);
  W16(nT);
  W16(sr);
  W16(lg2);
  W16(nT * 16 - sr);
  // Table directory
  for (const n of tNames) {
    for (let i = 0; i < 4; i++) out[p++] = n.charCodeAt(i) || 0x20;
    W32(tables[n].csum());
    W32(tOfs[n]);
    W32(tables[n].len);
  }
  // Table data
  for (const n of tNames) out.set(tables[n].buf(), tOfs[n]);

  // Fix checkSumAdjustment in head
  let fs = 0;
  for (let i = 0; i < out.length; i += 4)
    fs = (fs + dv.getUint32(i, false)) >>> 0;
  dv.setUint32(tOfs["head"] + 8, (0xb1b0afba - fs) >>> 0, false);

  return out.buffer;
}

// ─── UI helpers ────────────────────────────────────────────────────────────
const Btn = ({
  onClick,
  active,
  accent = "#6366f1",
  children,
  title,
  small,
}: any) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      padding: small ? "2px 7px" : "3px 10px",
      "font-size": "12px",
      "border-radius": "4px",
      cursor: "pointer",
      border: "none",
      background: active ? accent : "#1e293b",
      color: "#f8fafc",
      "font-weight": active ? "bold" : "normal",
      outline: active ? `2px solid ${accent}` : "2px solid transparent",
      transition: "all .1s",
    }}
  >
    {children}
  </button>
);
const NumInput = ({ label, value, onChange, w = 50 }: any) => (
  <div
    style={{
      display: "flex",
      "align-items": "center",
      "margin-bottom": "4px",
      gap: "4px",
    }}
  >
    <span
      style={{
        flex: 1,
        color: "#64748b",
        "font-size": "11px",
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
      }}
    >
      {label}
    </span>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: w,
        background: "#0f172a",
        border: "1px solid #334155",
        "border-radius": "3px",
        color: "#f8fafc",
        padding: "2px 4px",
        "font-size": "11px",
      }}
    />
  </div>
);

// ─── App ───────────────────────────────────────────────────────────────────
function App() {
  const [font, setFont] = createSignal(makeFont());
  const [selKey, setSelKey] = createSignal("U+0041");
  const [tool, setTool] = createSignal("draw");
  const [zoom, setZoom] = createSignal(30);
  const [showGuides, setShowGuides] = createSignal(true);
  const [previewText, setPreviewText] = createSignal("ABCDEFG");
  const [previewScale, setPreviewScale] = createSignal(3);
  let drawing = false,
    drawVal = 1;
  let gridRef = null as any,
    previewRef = null as any;

  const glyph = () => font().glyphs[selKey()];

  const updateGlyph = (key: any, updater: any) => {
    setFont((f) => {
      const g = f.glyphs[key];
      const next =
        typeof updater === "function" ? updater(g) : { ...g, ...updater };
      return {
        ...f,
        glyphs: { ...f.glyphs, [key]: next },
        meta: { ...f.meta, modified: new Date().toISOString() },
      };
    });
  };

  const setPixel = (r: any, c: any, val: any) => {
    updateGlyph(selKey(), (g: any) => {
      if (g.bitmap[r]?.[c] === val) return g;
      const bm = g.bitmap.map((row: any) => [...row]);
      bm[r][c] = val;
      return { ...g, bitmap: bm };
    });
  };

  const fillBucket = (sr: any, sc: any, fillVal: any) => {
    updateGlyph(selKey(), (g: any) => {
      const old = g.bitmap[sr]?.[sc];
      if (old === fillVal) return g;
      const bm = g.bitmap.map((row: any) => [...row]);
      const stack = [[sr, sc]],
        seen = new Set();
      while (stack.length) {
        const [r, c] = stack.pop() as any,
          k = `${r},${c}`;
        if (
          seen.has(k) ||
          r < 0 ||
          r >= g.height ||
          c < 0 ||
          c >= g.width ||
          bm[r][c] !== old
        )
          continue;
        seen.add(k);
        bm[r][c] = fillVal;
        stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
      }
      return { ...g, bitmap: bm };
    });
  };

  const getCell = (e: any) => {
    const rect = gridRef.getBoundingClientRect();
    return [
      Math.floor((e.clientY - rect.top) / zoom()),
      Math.floor((e.clientX - rect.left) / zoom()),
    ];
  };

  const onGridDown = (e: any) => {
    e.preventDefault();
    if (!glyph()) return;
    const [r, c] = getCell(e);
    if (r < 0 || r >= glyph().height || c < 0 || c >= glyph().width) return;
    if (tool() === "fill") {
      fillBucket(r, c, 1);
      return;
    }
    drawing = true;
    drawVal = tool() === "erase" ? 0 : glyph().bitmap[r][c] === 1 ? 0 : 1;
    setPixel(r, c, drawVal);
    gridRef.setPointerCapture(e.pointerId);
  };
  const onGridMove = (e: any) => {
    if (!drawing || !glyph()) return;
    const [r, c] = getCell(e);
    if (r >= 0 && r < glyph().height && c >= 0 && c < glyph().width)
      setPixel(r, c, drawVal);
  };

  const clearGlyph = () =>
    updateGlyph(selKey(), (g: any) => ({
      ...g,
      bitmap: emptyBm(g.width, g.height),
    }));
  const invertGlyph = () =>
    updateGlyph(selKey(), (g: any) => ({
      ...g,
      bitmap: g.bitmap.map((r: any) => r.map((v: any) => 1 - v)),
    }));
  const shiftGlyph = (dr: any, dc: any) =>
    updateGlyph(selKey(), (g: any) => {
      const bm = emptyBm(g.width, g.height);
      for (let r = 0; r < g.height; r++)
        for (let c = 0; c < g.width; c++) {
          const nr = r + dr,
            nc = c + dc;
          if (nr >= 0 && nr < g.height && nc >= 0 && nc < g.width)
            bm[nr][nc] = g.bitmap[r][c];
        }
      return { ...g, bitmap: bm };
    });

  const saveFont = () => {
    const blob = new Blob([JSON.stringify(font(), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `${font().meta.name.replace(/\s+/g, "_") || "font"}.pxfont.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const loadFont = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        setFont(JSON.parse(ev!.target!.result! as any));
      } catch {
        alert("Invalid font file");
      }
    };
    r.readAsText(f);
    e.target.value = "";
  };
  const exportOTF = () => {
    try {
      const buf = buildTTF(font());
      const blob = new Blob([buf], { type: "font/otf" });
      const url = URL.createObjectURL(blob),
        a = document.createElement("a");
      a.href = url;
      a.download = `${font().meta.name.replace(/\s+/g, "_") || "font"}.otf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("OTF export failed: " + e.message);
    }
  };

  // Preview canvas
  createEffect(() => {
    const canvas = previewRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"),
      s = previewScale();
    const asc = font().metrics.ascender,
      desc = font().metrics.descender;
    const lineH = (asc - desc + 2) * s,
      baselineY = (asc + 1) * s;
    let totalW = 8;
    for (const ch of previewText()) {
      const g = font().glyphs[cpKey(ch.codePointAt(0))];
      totalW += g ? g.advanceWidth * s : 4 * s;
    }
    canvas.width = Math.max(totalW, 300);
    canvas.height = lineH;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ef444430";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(canvas.width, baselineY);
    ctx.stroke();
    let x = 4;
    for (const ch of previewText()) {
      const g = font().glyphs[cpKey(ch.codePointAt(0))];
      if (!g) {
        x += 4 * s;
        continue;
      }
      const top = baselineY - g.bearingTop * s;
      ctx.fillStyle = "#f8fafc";
      for (let r = 0; r < g.height; r++)
        for (let c = 0; c < g.width; c++)
          if (g.bitmap[r][c])
            ctx.fillRect(x + (g.bearingLeft + c) * s, top + r * s, s, s);
      x += g.advanceWidth * s;
    }
  });

  const guideRow = (y: any) => font().metrics.ascender - y;
  const divider = (
    <div
      style={{
        width: "1px",
        height: "20px",
        background: "#334155",
        margin: "0 2px",
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        height: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
        "font-family": "monospace",
        "user-select": "none",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          "align-items": "center",
          gap: "6px",
          padding: "6px 12px",
          background: "#0d1829",
          "border-bottom": "1px solid #1e293b",
          "flex-shrink": 0,
          "flex-wrap": "wrap",
        }}
      >
        <span style={{ "font-size": "16px", "margin-right": "4px" }}>🔲</span>
        <input
          value={font().meta.name}
          onChange={(e) =>
            setFont((f) => ({
              ...f,
              meta: { ...f.meta, name: e.target.value },
            }))
          }
          placeholder="Font name…"
          style={{
            background: "transparent",
            border: "1px solid #334155",
            "border-radius": "4px",
            color: "#f8fafc",
            padding: "3px 8px",
            "font-size": "13px",
            width: "140px",
          }}
        />
        {divider}
        {[
          ["draw", "✏️", "Draw"],
          ["erase", "◻", "Erase"],
          ["fill", "🪣", "Fill"],
        ].map(([id, ic, lb]) => (
          <Btn key={id} onClick={() => setTool(id)} active={tool() === id}>
            {ic} {lb}
          </Btn>
        ))}
        {divider}
        <Btn
          onClick={() => setShowGuides((v) => !v)}
          active={showGuides()}
          accent="#0ea5e9"
        >
          📏 Guides
        </Btn>
        <div style={{ flex: 1 }} />
        <button
          onClick={exportOTF}
          style={{
            padding: "3px 12px",
            "font-size": "12px",
            "border-radius": "4px",
            cursor: "pointer",
            border: "none",
            background: "#7c3aed",
            color: "#fff",
            "font-weight": "bold",
          }}
        >
          ⬇ Export OTF
        </button>
        <button
          onClick={saveFont}
          style={{
            padding: "3px 12px",
            "font-size": "12px",
            "border-radius": "4px",
            cursor: "pointer",
            border: "none",
            background: "#16a34a",
            color: "#fff",
            "font-weight": "bold",
          }}
        >
          💾 Save JSON
        </button>
        <label
          style={{
            padding: "3px 12px",
            "font-size": "12px",
            "border-radius": "4px",
            cursor: "pointer",
            background: "#1e293b",
            color: "#f8fafc",
            "font-weight": "bold",
          }}
        >
          📂 Load JSON
          <input
            type="file"
            accept=".json"
            onChange={loadFont}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Middle */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left: char list */}
        <div
          style={{
            width: "170px",
            background: "#0d1829",
            "border-right": "1px solid #1e293b",
            display: "flex",
            "flex-direction": "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "6px 8px 4px",
              "font-size": "10px",
              color: "#475569",
              "letter-spacing": "1px",
            }}
          >
            CHARACTERS
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "0 8px 8px" }}>
            <div
              style={{
                display: "grid",
                "grid-template-columns": "repeat(6,1fr)",
                gap: "2px",
              }}
            >
              {Object.entries(font().glyphs).map(([key, g]) => {
                const filled = g.bitmap.some((r) => r.some((v) => v)),
                  sel = key === selKey();
                return (
                  <div
                    key={key}
                    onClick={() => setSelKey(key)}
                    style={{
                      "aspect-ratio": "1",
                      display: "flex",
                      "align-items": "center",
                      "justify-content": "center",
                      "font-size": "11px",
                      "border-radius": "3px",
                      cursor: "pointer",
                      border: `1px solid ${sel ? "#6366f1" : filled ? "#1e3a5f" : "transparent"}`,
                      background: sel
                        ? "#1e1b4b"
                        : filled
                          ? "#0f1e33"
                          : "transparent",
                      color: sel ? "#a5b4fc" : filled ? "#7dd3fc" : "#334155",
                    }}
                  >
                    {g.name === "space" ? "·" : g.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: grid editor */}
        <div
          style={{
            flex: 1,
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
            overflow: "auto",
            padding: "20px",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
              "align-items": "center",
              "flex-wrap": "wrap",
              "justify-content": "center",
            }}
          >
            <span
              style={{
                "font-size": "13px",
                color: "#475569",
                "min-width": "60px",
                "text-align": "center",
              }}
            >
              {glyph()?.name === "space" ? "SPACE" : `'${glyph()?.name}'`}
              <span
                style={{
                  "font-size": "10px",
                  color: "#334155",
                  "margin-left": "4px",
                }}
              >
                {selKey()}
              </span>
            </span>
            <Btn onClick={clearGlyph} accent="#ef4444">
              Clear
            </Btn>
            <Btn onClick={invertGlyph} accent="#f59e0b">
              Invert
            </Btn>
            <div style={{ display: "flex", gap: "2px" }}>
              {[
                ["↑", -1, 0],
                ["↓", 1, 0],
                ["←", 0, -1],
                ["→", 0, 1],
              ].map(([ic, dr, dc]) => (
                <Btn key={ic} onClick={() => shiftGlyph(dr, dc)} small>
                  {ic}
                </Btn>
              ))}
            </div>
            <div
              style={{ display: "flex", "align-items": "center", gap: "5px" }}
            >
              <span style={{ "font-size": "11px", color: "#475569" }}>
                zoom
              </span>
              <input
                type="range"
                min={14}
                max={52}
                value={zoom()}
                onChange={(e) => setZoom(+e.target.value)}
                style={{ width: "70px" }}
              />
              <span
                style={{ "font-size": "11px", color: "#334155", width: "26px" }}
              >
                {zoom()}px
              </span>
            </div>
          </div>

          {glyph() && (
            <div style={{ position: "relative", "margin-left": "52px" }}>
              {/* Horizontal guides */}
              {showGuides() &&
                font().guidelines.map((guide) => {
                  const row = guideRow(guide.y);
                  if (row < 0 || row > glyph().height) return null;
                  return (
                    <div
                      key={guide.name}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${row * zoom() - 0.5}px`,
                        "border-top": `1.5px dashed ${guide.color}55`,
                        "z-index": 5,
                        "pointer-events": "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: "100%",
                          top: "-8px",
                          "padding-right": "6px",
                          "font-size": "9px",
                          color: guide.color,
                          "white-space": "nowrap",
                        }}
                      >
                        {guide.name}
                      </span>
                    </div>
                  );
                })}
              {/* Advance width vertical guide */}
              {showGuides() &&
                (() => {
                  const x =
                    (glyph().advanceWidth - glyph().bearingLeft) * zoom() - 0.5;
                  return (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: x + "px",
                        "border-left": "1.5px dashed #f59e0b88",
                        "z-index": 5,
                        "pointer-events": "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 4 + "px",
                          "padding-top": 3 + "px",
                          "font-size": 9 + "px",
                          color: "#f59e0b",
                          "white-space": "nowrap",
                        }}
                      >
                        adv. width
                      </span>
                    </div>
                  );
                })()}

              <div
                ref={gridRef}
                onPointerDown={onGridDown}
                onPointerMove={onGridMove}
                onPointerUp={() => {
                  drawing = false;
                }}
                style={{
                  display: "grid",
                  "grid-template-columns": `repeat(${glyph().width},${zoom()}px)`,
                  "grid-template-rows": `repeat(${glyph().height},${zoom()}px)`,
                  border: "1px solid #1e293b",
                  cursor: "crosshair",
                  "touch-action": "none",
                  "box-shadow": "0 0 30px #0000009a",
                }}
              >
                {glyph().bitmap.map((row, r) =>
                  row.map((px, c) => (
                    <div
                      key={`${r}-${c}`}
                      style={{
                        width: zoom() + "px",
                        height: zoom() + "px",
                        "box-sizing": "border-box",
                        background: px
                          ? "#f1f5f9"
                          : (r + c) % 2 === 0
                            ? "#111827"
                            : "#0c1220",
                        "border-right":
                          c < glyph().width - 1 ? "1px solid #1a2535" : "none",
                        "border-bottom":
                          r < glyph().height - 1 ? "1px solid #1a2535" : "none",
                      }}
                    />
                  )),
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: properties */}
        <div
          style={{
            width: 190 + "px",
            background: "#0d1829",
            "border-left": "1px solid #1e293b",
            overflow: "auto",
            padding: "8px 12px",
            "font-size": 12 + "px",
          }}
        >
          <div
            style={{
              "font-size": 10 + "px",
              color: "#475569",
              "letter-spacing": 1 + "px",
              "margin-bottom": 8 + "px",
            }}
          >
            GLYPH
          </div>
          {glyph() && (
            <>
              <NumInput
                label="Advance W"
                value={glyph().advanceWidth}
                onChange={(v) => updateGlyph(selKey(), { advanceWidth: +v })}
              />
              <NumInput
                label="Bearing L"
                value={glyph().bearingLeft}
                onChange={(v) => updateGlyph(selKey(), { bearingLeft: +v })}
              />
              <NumInput
                label="Bearing T"
                value={glyph().bearingTop}
                onChange={(v) => updateGlyph(selKey(), { bearingTop: +v })}
              />
              <NumInput
                label="Width"
                value={glyph().width}
                onChange={(v) => {
                  const w = Math.max(1, Math.min(32, +v));
                  updateGlyph(selKey(), (g) => ({
                    ...g,
                    width: w,
                    bitmap: Array.from({ length: g.height }, (_, r) =>
                      Array.from(
                        { length: w },
                        (_, c) => g.bitmap[r]?.[c] ?? 0,
                      ),
                    ),
                  }));
                }}
              />
              <NumInput
                label="Height"
                value={glyph().height}
                onChange={(v) => {
                  const h = Math.max(1, Math.min(32, +v));
                  updateGlyph(selKey(), (g) => ({
                    ...g,
                    height: h,
                    bitmap: Array.from({ length: h }, (_, r) =>
                      Array.from(
                        { length: g.width },
                        (_, c) => g.bitmap[r]?.[c] ?? 0,
                      ),
                    ),
                  }));
                }}
              />
            </>
          )}

          <div
            style={{
              "font-size": 10 + "px",
              color: "#475569",
              "letter-spacing": 1 + "px",
              margin: "14px 0 8px",
            }}
          >
            FONT METRICS
          </div>
          {Object.entries(font().metrics).map(([k, v]) => (
            <NumInput
              key={k}
              label={k}
              value={v}
              onChange={(val) =>
                setFont((f) => ({ ...f, metrics: { ...f.metrics, [k]: +val } }))
              }
            />
          ))}

          <div
            style={{
              "font-size": 10 + "px",
              color: "#475569",
              "letter-spacing": 1 + "px",
              margin: "14px 0 8px",
            }}
          >
            GUIDELINES
          </div>
          {font().guidelines.map((g, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                "align-items": "center",
                gap: 5 + "px",
                "margin-bottom": 5 + "px",
              }}
            >
              <div
                style={{
                  width: 8 + "px",
                  height: 8 + "px",
                  "border-radius": "50%",
                  background: g.color,
                  "flex-shrink": 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  color: "#64748b",
                  "font-size": 11 + "px",
                  overflow: "hidden",
                  "text-overflow": "ellipsis",
                }}
              >
                {g.name}
              </span>
              <input
                type="number"
                value={g.y}
                onChange={(e) =>
                  setFont((f) => ({
                    ...f,
                    guidelines: f.guidelines.map((gg, j) =>
                      j === i ? { ...gg, y: +e.target.value } : gg,
                    ),
                  }))
                }
                style={{
                  width: 38 + "px",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  "border-radius": 3 + "px",
                  color: "#f8fafc",
                  padding: "2px 4px",
                  "font-size": 11 + "px",
                }}
              />
            </div>
          ))}

          <div
            style={{
              "font-size": 10 + "px",
              color: "#475569",
              "letter-spacing": 1 + "px",
              margin: "14px 0 8px",
            }}
          >
            META
          </div>
          {[
            ["author", "Author"],
            ["description", "Desc"],
          ].map(([k, lbl]) => (
            <div key={k} style={{ "margin-bottom": 6 + "px" }}>
              <div
                style={{
                  "font-size": 11 + "px",
                  color: "#475569",
                  "margin-bottom": 2 + "px",
                }}
              >
                {lbl}
              </div>
              <input
                value={font().meta[k]}
                onChange={(e) =>
                  setFont((f) => ({
                    ...f,
                    meta: { ...f.meta, [k]: e.target.value },
                  }))
                }
                style={{
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  "border-radius": 3 + "px",
                  color: "#f8fafc",
                  padding: "2px 5px",
                  "font-size": 11 + "px",
                  "box-sizing": "border-box",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: preview */}
      <div
        style={{
          background: "#0d1829",
          "border-top": "1px solid #1e293b",
          padding: "7px 12px",
          "flex-shrink": 0,
        }}
      >
        <div
          style={{
            display: "flex",
            "align-items": "center",
            gap: 8 + "px",
            "margin-bottom": 6 + "px",
          }}
        >
          <span
            style={{
              "font-size": 10 + "px",
              color: "#475569",
              "letter-spacing": 1 + "px",
              "white-space": "nowrap",
            }}
          >
            PREVIEW
          </span>
          <input
            value={previewText()}
            onChange={(e) => setPreviewText(e.target.value)}
            style={{
              flex: 1,
              background: "#0f172a",
              border: "1px solid #334155",
              "border-radius": 4 + "px",
              color: "#f8fafc",
              padding: "2px 8px",
              "font-size": 12 + "px",
            }}
          />
          <span style={{ "font-size": 11 + "px", color: "#475569" }}>
            scale
          </span>
          <input
            type="range"
            min={1}
            max={8}
            value={previewScale()}
            onChange={(e) => setPreviewScale(+e.target.value)}
            style={{ width: 70 + "px" }}
          />
          <span
            style={{
              "font-size": 11 + "px",
              color: "#334155",
              width: 20 + "px",
            }}
          >
            {previewScale()}×
          </span>
        </div>
        <div
          style={{
            overflow: "auto",
            background: "#050a14",
            "border-radius": 4 + "px",
            padding: "4px 0",
            "max-height": 90 + "px",
          }}
        >
          <canvas
            ref={previewRef}
            style={{ display: "block", "image-rendering": "pixelated" }}
          />
        </div>
      </div>
    </div>
  );
}
