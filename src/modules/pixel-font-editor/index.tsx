import { createEffect, createSignal, For, JSX, Show } from "solid-js";
import { buildTTF } from "./otf";
import { FontData, FontDataGlyph, FontDataGuideline } from "./types";

const CHARSET =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~😎";
const CHARSET_AS_ARRAY: string[] = [];
for (const ch of CHARSET) {
  CHARSET_AS_ARRAY.push(ch);
}

const cpKey = (cp: number) =>
  `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
const emptyBm = (w: number, h: number) =>
  Array.from({ length: h }, () => Array(w).fill(0));

const GLYPH_CANVAS_SIZE = 64;
const GLYPH_CANVAS_MIDPOINT = GLYPH_CANVAS_SIZE / 2;

function makeFont(): FontData {
  const DW = GLYPH_CANVAS_SIZE;
  const DH = GLYPH_CANVAS_SIZE;
  const glyphs: Record<string, FontDataGlyph> = {};
  for (const ch of CHARSET) {
    const cp = ch.codePointAt(0),
      key = cpKey(cp!),
      sp = ch === " ";
    glyphs[key] = {
      name: sp ? "space" : ch,
      codePoint: cp!,
      advanceWidth: sp ? 5 : 9,
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
    },
    glyphs,
  };
}

const colors = {
  background: "#a3a3a3",
  text: "#000000",
  text2: "#475569",
  border: "#5e5e5e",

  canvas: {
    bg1: "#a3a3a3",
    bg2: "#b0b0b0",
    border: "#909090",
    guideline: "#333333",
    fill: "#000000",
  },
};

// ─── UI helpers ────────────────────────────────────────────────────────────
type BtnProps = {
  onClick: () => void;
  active?: boolean;
  accent?: string;
  children?: JSX.Element;
  title?: string;
  small?: boolean;
};

const Btn = (props: BtnProps) => (
  <button
    onClick={props.onClick}
    title={props.title}
    style={{
      padding: props.small ? "2px 7px" : "3px 10px",
      "font-size": "12px",
      "border-radius": "4px",
      cursor: "pointer",
      border: "none",
      background: props.active ? props.accent || "#6366f1" : "#1e293b",
      color: "#f8fafc",
      "font-weight": props.active ? "bold" : "normal",
      outline: props.active
        ? `2px solid ${props.accent}`
        : "2px solid transparent",
      transition: "all .1s",
    }}
  >
    {props.children}
  </button>
);

type NumInputProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  w?: number;
};
const NumInput = (props: NumInputProps) => (
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
        color: colors.text,
        "font-size": "11px",
        overflow: "hidden",
        "text-overflow": "ellipsis",
        "white-space": "nowrap",
      }}
    >
      {props.label}
    </span>
    <input
      type="number"
      value={props.value}
      onInput={(e) => props.onChange(e.target.value)}
      style={{
        width: (props.w || 50) + "px",
        background: colors.background,
        border: `1px solid ${colors.border}`,
        "border-radius": "3px",
        color: colors.text,
        padding: "2px 4px",
        "font-size": "11px",
      }}
    />
  </div>
);

// ─── App ───────────────────────────────────────────────────────────────────
export function PixelFontEditor() {
  const [font, setFont] = createSignal(makeFont());
  const [selKey, setSelKey] = createSignal("U+0041");
  const [zoom, setZoom] = createSignal(14);
  const [showGuides, setShowGuides] = createSignal(true);
  const [previewText, setPreviewText] = createSignal("ABCDEFG");
  const [previewScale, setPreviewScale] = createSignal(3);
  let drawing = false;
  let drawVal = 1;
  let gridRef: HTMLCanvasElement = null!;
  let previewRef: HTMLCanvasElement = null!;

  const glyph = () => font().glyphs[selKey()];

  const fontVerticalGuidelines = () => {
    const guides: FontDataGuideline[] = [
      { name: "baseline", y: 0, color: "#ef4444" },
      { name: "xHeight", y: font().metrics.xHeight, color: "#22c55e" },
      { name: "capHeight", y: font().metrics.capHeight, color: "#3b82f6" },
      { name: "ascender", y: font().metrics.ascender, color: "#a855f7" },
      { name: "descender", y: font().metrics.descender, color: "#a855f7" },
    ];

    return guides;
  };
  const fontHorizontalGuidelines = () => {
    const guides: FontDataGuideline[] = [
      { name: "baseline", y: 0, color: "#ef4444" },
      { name: "width", y: glyph().advanceWidth, color: "#3b82f6" },
    ];

    return guides;
  };

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
    drawing = true;
    drawVal = glyph().bitmap[r][c] === 1 ? 0 : 1;
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

  const saveFont = () => {
    const blob = new Blob([JSON.stringify(font())], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `${font().meta.name.replace(/\s+/g, "_") || "font"}.pxfont.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const loadFont: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (e) => {
    const f = e.target.files![0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        setFont(JSON.parse(ev.target!.result! as any));
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

  // Grid canvas
  createEffect(() => {
    const canvas = gridRef;
    const g = glyph();
    if (!canvas || !g) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const z = zoom();
    const dpr = window.devicePixelRatio || 1;
    const w = g.width * z;
    const h = g.height * z;

    // Set canvas size accounting for device pixel ratio
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    // Draw checkerboard background
    for (let r = 0; r < g.height; r++) {
      for (let c = 0; c < g.width; c++) {
        ctx.fillStyle =
          (r + c) % 2 === 0 ? colors.canvas.bg2 : colors.canvas.bg1;
        ctx.fillRect(c * z, r * z, z, z);
      }
    }

    // Draw grid lines (1 physical pixel wide)
    ctx.strokeStyle = colors.canvas.border;
    ctx.lineWidth = 1 / dpr;
    for (let r = 1; r < g.height; r++) {
      const y = Math.round(r * z * dpr) / dpr + 0.5 / dpr;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let c = 1; c < g.width; c++) {
      const x = Math.round(c * z * dpr) / dpr + 0.5 / dpr;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // Draw filled pixels
    ctx.fillStyle = colors.canvas.fill;
    for (let r = 0; r < g.height; r++) {
      for (let c = 0; c < g.width; c++) {
        if (g.bitmap[r][c]) {
          ctx.fillRect(c * z, r * z, z, z);
        }
      }
    }
  });

  // Preview canvas
  createEffect(() => {
    const canvas = previewRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const scale = previewScale();
    const ascender = font().metrics.ascender;
    const decender = font().metrics.descender;
    const lineH = (ascender - decender + 2) * scale,
      baselineY = (ascender + 1) * scale;
    let totalW = 8;
    for (const ch of previewText()) {
      const g = font().glyphs[cpKey(ch.codePointAt(0)!)];
      totalW += g ? g.advanceWidth * scale : 4 * scale;
    }
    canvas.width = Math.max(totalW, 300);
    canvas.height = lineH;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(canvas.width, baselineY);
    ctx.stroke();
    let x = 4;
    for (const ch of previewText()) {
      const glyph = font().glyphs[cpKey(ch.codePointAt(0)!)];
      if (!glyph) {
        x += 4 * scale;
        continue;
      }
      const top = baselineY - GLYPH_CANVAS_MIDPOINT * scale;
      ctx.fillStyle = colors.text;
      for (let canvasRow = 0; canvasRow < glyph.height; canvasRow++)
        for (let canvasColumn = 0; canvasColumn < glyph.width; canvasColumn++)
          if (glyph.bitmap[canvasRow][canvasColumn])
            ctx.fillRect(
              x + (-GLYPH_CANVAS_MIDPOINT + canvasColumn) * scale,
              top + canvasRow * scale,
              scale,
              scale,
            );
      x += glyph.advanceWidth * scale;
    }
  });

  const guideRow = (y: number) => GLYPH_CANVAS_MIDPOINT - y;
  const divider = (
    <div
      style={{
        width: "1px",
        height: "20px",
        background: colors.border,
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
        background: colors.background,
        color: colors.text,
        "font-family": "monospace",
        "user-select": "none",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div
          style={{
            width: "220px",
            background: colors.background,
            "border-right": `1px solid ${colors.border}`,
            display: "flex",
            "flex-direction": "column",
            overflow: "hidden",
          }}
        >
          <div
            css={{
              height: 52,
              padding: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              value={font().meta.name}
              onInput={(e) =>
                setFont((f) => ({
                  ...f,
                  meta: { ...f.meta, name: e.target.value },
                }))
              }
              placeholder="Font name…"
              style={{
                background: "transparent",
                border: `1px solid ${colors.border}`,
                "border-radius": "4px",
                color: colors.text,
                padding: "3px 8px",
                "font-size": "13px",
                "min-width": 0,
                height: "32px",
                width: "100%",
              }}
            />
          </div>
          {/* <div
            style={{
              "font-size": 10 + "px",
              color: colors.text2,
              "letter-spacing": 1 + "px",
              margin: "0px 19px 8px",
            }}
          >
            FONT METRICS
          </div> */}
          <div css={{ pl: 19, pr: 10 }}>
            {Object.entries(font().metrics).map(([k, v]) => (
              <NumInput
                label={k}
                value={v}
                onChange={(val) =>
                  setFont((f) => ({
                    ...f,
                    metrics: { ...f.metrics, [k]: +val },
                  }))
                }
              />
            ))}
          </div>

          <div css={{ flex: "1 0 0px" }} />

          <div
            css={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              px: 19,
              pb: 19,
            }}
          >
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
                "text-align": "center",
              }}
            >
              📂 Load JSON
              <input
                type="file"
                accept=".json"
                onInput={loadFont}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <div
          style={{
            width: "220px",
            background: colors.background,
            "border-right": `1px solid ${colors.border}`,
            display: "flex",
            "flex-direction": "column",
            overflow: "hidden",
          }}
        >
          <div
            css={{
              height: 52,
              display: "flex",
              alignItems: "center",
              px: 16,
            }}
          >
            <div
              style={{
                "font-size": "10px",
                color: colors.text2,
                "letter-spacing": "1px",
              }}
            >
              CHARACTERS
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "0 8px 8px" }}>
            <div
              style={{
                display: "grid",
                "grid-template-columns": "repeat(8,1fr)",
                gap: "2px",
              }}
            >
              <For each={CHARSET_AS_ARRAY}>
                {(character) => {
                  const codepoint = () => character.codePointAt(0)!;
                  const key = () => cpKey(codepoint());
                  const filled = () =>
                    font().glyphs[
                      cpKey(character.codePointAt(0)!)
                    ]?.bitmap.some((r) => r.some((v) => v));
                  const sel = () => key() === selKey();
                  return (
                    <div
                      onClick={() => {
                        const codepoint = character.codePointAt(0)!;
                        const key = cpKey(codepoint);
                        const glyph = font().glyphs[key];
                        if (!glyph) {
                          setFont((prev) => ({
                            ...prev,
                            glyphs: {
                              ...prev.glyphs,
                              [key]: {
                                name: character === " " ? "space" : character,
                                codePoint: codepoint,
                                advanceWidth: font().metrics.capHeight,
                                width: GLYPH_CANVAS_SIZE,
                                height: GLYPH_CANVAS_SIZE,
                                bitmap: emptyBm(
                                  GLYPH_CANVAS_SIZE,
                                  GLYPH_CANVAS_SIZE,
                                ),
                              },
                            },
                          }));
                        }
                        setSelKey(key);
                      }}
                      style={{
                        "aspect-ratio": "1",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        "font-size": "11px",
                        "border-radius": "3px",
                        cursor: "pointer",
                        border: `1px solid ${sel() ? "#6366f1" : filled() ? "#1e3a5f" : "transparent"}`,
                        background: sel()
                          ? "#1e1b4b"
                          : filled()
                            ? "#0f1e33"
                            : "transparent",
                        color: sel()
                          ? "#a5b4fc"
                          : filled()
                            ? "#7dd3fc"
                            : "#334155",
                      }}
                    >
                      {character === " " ? "·" : character}
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            "flex-direction": "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              background: colors.background,
              height: "53px",
              "border-bottom": `1px solid ${colors.border}`,
              "flex-shrink": 0,
              "align-items": "center",
              padding: "0px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5px",
                "align-items": "center",
                flex: "1 0 0px",
              }}
            >
              <span
                style={{
                  "font-size": "13px",
                  color: colors.text,
                  "min-width": "60px",
                  "text-align": "center",
                }}
              >
                {glyph()?.name === "space" ? "SPACE" : `'${glyph()?.name}'`}
                {glyph()?.codePoint}
                <span
                  style={{
                    "font-size": "10px",
                    color: colors.text,
                    "margin-left": "4px",
                  }}
                >
                  {selKey()}
                </span>
              </span>
            </div>
            <Btn onClick={clearGlyph} accent="#ef4444">
              Clear
            </Btn>
            <Show when={glyph()}>
              <NumInput
                label="Width"
                value={glyph().advanceWidth}
                onChange={(v) => updateGlyph(selKey(), { advanceWidth: +v })}
              />
            </Show>

            <div
              style={{
                display: "flex",
                gap: "5px",
                "align-items": "center",
                "justify-content": "flex-end",
                flex: "1 0 0px",
              }}
            >
              <div
                style={{ display: "flex", "align-items": "center", gap: "5px" }}
              >
                <span style={{ "font-size": "11px", color: colors.text }}>
                  zoom
                </span>
                <input
                  type="range"
                  min={14}
                  max={52}
                  value={zoom()}
                  onInput={(e) => setZoom(+e.target.value)}
                  style={{ width: "70px" }}
                />
                <span
                  style={{
                    "font-size": "11px",
                    color: colors.text,
                    width: "26px",
                  }}
                >
                  {zoom()}px
                </span>
              </div>
              <Btn
                onClick={() => setShowGuides((v) => !v)}
                active={showGuides()}
                accent="#0ea5e9"
              >
                📏 Guides
              </Btn>
            </div>
          </div>

          {glyph() && (
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                padding: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  transform: `translate(${(glyph().advanceWidth * zoom()) / -2}px, ${(font().metrics.capHeight * zoom()) / 2}px)`,
                }}
              >
                <Show when={showGuides()}>
                  <For each={fontVerticalGuidelines()}>
                    {(guide) => {
                      const row = guideRow(guide.y);
                      if (row < 0 || row > glyph().height) return null;
                      return (
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: `${row * zoom() - 0.5}px`,
                            "border-top": `1px solid ${colors.canvas.guideline}`,
                            "z-index": 5,
                            "pointer-events": "none",
                          }}
                        >
                          {/* <span
                            style={{
                              position: "absolute",
                              right: "100%",
                              top: "-8px",
                              "padding-right": "6px",
                              "font-size": "9px",
                              color: colors.canvas.guideline,
                              "white-space": "nowrap",
                            }}
                          >
                            {guide.name}
                          </span> */}
                        </div>
                      );
                    }}
                  </For>
                  <For each={fontHorizontalGuidelines()}>
                    {(guide) => {
                      const row = guideRow(guide.y);
                      if (row < 0 || row > glyph().height) return null;
                      return (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left:
                              (GLYPH_CANVAS_MIDPOINT + guide.y) * zoom() -
                              0.5 +
                              "px",
                            "border-left": `1px solid ${colors.canvas.guideline}`,
                            "z-index": 5,
                            "pointer-events": "none",
                          }}
                        >
                          {/* <span
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 4 + "px",
                              "padding-top": 3 + "px",
                              "font-size": 9 + "px",
                              color: colors.canvas.guideline,
                              "white-space": "nowrap",
                            }}
                          >
                            {guide.name}
                          </span> */}
                        </div>
                      );
                    }}
                  </For>
                </Show>
                <canvas
                  ref={gridRef}
                  onPointerDown={onGridDown}
                  onPointerMove={onGridMove}
                  onPointerUp={() => {
                    drawing = false;
                  }}
                  style={{
                    border: `1px solid ${colors.canvas.border}`,
                    cursor: "crosshair",
                    "touch-action": "none",
                    "box-shadow": `0 0 0 4px #808080, 4px 4px 0 4px #808080`,
                    "image-rendering": "pixelated",
                  }}
                />
              </div>
            </div>
          )}

          <PreviewSection font={font()} />
        </div>
      </div>
    </div>
  );
}

function PreviewSection(props: { font: FontData }) {
  const font = () => props.font;
  const [previewText, setPreviewText] = createSignal("ABCDEFG");
  const [previewScale, setPreviewScale] = createSignal(3);
  let previewRef: HTMLCanvasElement = null!;

  // Preview canvas
  createEffect(() => {
    const canvas = previewRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const scale = previewScale();
    const ascender = font().metrics.ascender;
    const decender = font().metrics.descender;
    const lineH = (ascender - decender + 2) * scale,
      baselineY = (ascender + 1) * scale;
    let totalW = 8;
    for (const ch of previewText()) {
      const g = font().glyphs[cpKey(ch.codePointAt(0)!)];
      totalW += g ? g.advanceWidth * scale : 4 * scale;
    }
    canvas.width = Math.max(totalW, 300);
    canvas.height = lineH;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(canvas.width, baselineY);
    ctx.stroke();
    let x = 4;
    for (const ch of previewText()) {
      const glyph = font().glyphs[cpKey(ch.codePointAt(0)!)];
      if (!glyph) {
        x += 4 * scale;
        continue;
      }
      const top = baselineY - GLYPH_CANVAS_MIDPOINT * scale;
      ctx.fillStyle = colors.text;
      for (let canvasRow = 0; canvasRow < glyph.height; canvasRow++)
        for (let canvasColumn = 0; canvasColumn < glyph.width; canvasColumn++)
          if (glyph.bitmap[canvasRow][canvasColumn])
            ctx.fillRect(
              x + (-GLYPH_CANVAS_MIDPOINT + canvasColumn) * scale,
              top + canvasRow * scale,
              scale,
              scale,
            );
      x += glyph.advanceWidth * scale;
    }
  });

  return (
    <div
      style={{
        background: colors.background,
        "border-top": `1px solid ${colors.border}`,
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
            color: colors.text2,
            "letter-spacing": 1 + "px",
            "white-space": "nowrap",
          }}
        >
          PREVIEW
        </span>
        <input
          value={previewText()}
          onInput={(e) => setPreviewText(e.target.value)}
          style={{
            flex: 1,
            background: colors.background,
            border: `1px solid ${colors.border}`,
            "border-radius": 4 + "px",
            color: colors.text,
            padding: "2px 8px",
            "font-size": 12 + "px",
          }}
        />
        <span style={{ "font-size": 11 + "px", color: colors.text2 }}>
          scale
        </span>
        <input
          type="range"
          min={1}
          max={8}
          value={previewScale()}
          onInput={(e) => setPreviewScale(+e.target.value)}
          style={{ width: 70 + "px" }}
        />
        <span
          style={{
            "font-size": 11 + "px",
            color: colors.text2,
            width: 20 + "px",
          }}
        >
          {previewScale()}×
        </span>
      </div>
      <div
        style={{
          overflow: "auto",
          background: "#c0c0c0",
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
  );
}
