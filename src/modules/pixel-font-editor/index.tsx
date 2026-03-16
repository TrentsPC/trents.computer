import { createEffect, createSignal, For, JSX, Show } from "solid-js";
import { buildTTF } from "./otf";
import { FontData, FontDataGlyph, FontDataGuideline } from "./types";

const CHARSET =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
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
      defaultAdvanceWidth: 9,
    },
    glyphs,
  };
}

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
        color: "#64748b",
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
export function PixelFontEditor() {
  const [font, setFont] = createSignal(makeFont());
  const [selKey, setSelKey] = createSignal("U+0041");
  const [zoom, setZoom] = createSignal(14);
  const [showGuides, setShowGuides] = createSignal(true);
  const [previewText, setPreviewText] = createSignal("ABCDEFG");
  const [previewScale, setPreviewScale] = createSignal(3);
  let drawing = false;
  let drawVal = 1;
  let gridRef = null as any;
  let previewRef = null as any;

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
      { name: "capHeight", y: glyph().advanceWidth, color: "#3b82f6" },
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

  // Preview canvas
  createEffect(() => {
    const canvas = previewRef;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"),
      scale = previewScale();
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
    ctx.strokeStyle = "#ef444430";
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
      ctx.fillStyle = "#f8fafc";
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
          onInput={(e) =>
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
            onInput={loadFont}
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
              <For each={Object.entries(font().glyphs)}>
                {([key, g]) => {
                  const filled = () => g.bitmap.some((r) => r.some((v) => v));
                  const sel = () => key === selKey();
                  return (
                    <div
                      onClick={() => setSelKey(key)}
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
                      {g.name === "space" ? "·" : g.name}
                    </div>
                  );
                }}
              </For>
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
                onInput={(e) => setZoom(+e.target.value)}
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
                          "border-left": `1.5px dashed ${guide.color}55`,
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
                            color: guide.color,
                            "white-space": "nowrap",
                          }}
                        >
                          baseline
                        </span>
                      </div>
                    );
                  }}
                </For>
              </Show>
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
                <For each={glyph().bitmap}>
                  {(row, r) => (
                    <For each={row}>
                      {(px, c) => (
                        <div
                          style={{
                            width: zoom() + "px",
                            height: zoom() + "px",
                            "box-sizing": "border-box",
                            background: px
                              ? "#f1f5f9"
                              : (r() + c()) % 2 === 0
                                ? "#111827"
                                : "#0c1220",
                            "border-right":
                              c() < glyph().width - 1
                                ? "1px solid #1a2535"
                                : "none",
                            "border-bottom":
                              r() < glyph().height - 1
                                ? "1px solid #1a2535"
                                : "none",
                          }}
                        />
                      )}
                    </For>
                  )}
                </For>
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
          <Show when={glyph()}>
            <NumInput
              label="Width"
              value={glyph().advanceWidth}
              onChange={(v) => updateGlyph(selKey(), { advanceWidth: +v })}
            />
          </Show>

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
              label={k}
              value={v}
              onChange={(val) =>
                setFont((f) => ({ ...f, metrics: { ...f.metrics, [k]: +val } }))
              }
            />
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
            onInput={(e) => setPreviewText(e.target.value)}
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
            onInput={(e) => setPreviewScale(+e.target.value)}
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
