import { FontData } from "./types";

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
export function buildTTF(fontData: FontData) {
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
