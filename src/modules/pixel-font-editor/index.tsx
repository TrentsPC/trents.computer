import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  JSX,
  Show,
} from "solid-js";
import { CHARACTER_DATA, CharacterSet } from "./character-data";
import "./font.css";
import newYork from "./new-york.pxfont.json";
import { buildTTF } from "./otf";
import { Slider } from "./Slider";
import { FontData, FontDataGlyph, FontDataGuideline } from "./types";
import unicodeData from "./UnicodeData.txt?url";

const CHARSET =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~𝒞😎";
const CHARSET_AS_ARRAY: string[] = [];
for (const ch of CHARSET) {
  CHARSET_AS_ARRAY.push(ch);
}

const cpKey = (cp: number) =>
  `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`;
const emptyBm = (w: number, h: number) =>
  Array.from({ length: h }, () => Array(w).fill(0).join(""));

const GLYPH_CANVAS_SIZE = 64;
const GLYPH_CANVAS_MIDPOINT = GLYPH_CANVAS_SIZE / 2;

function makeFont(): FontData {
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
      ascender: 10,
      descender: -2,
      xHeight: 6,
      capHeight: 8,
      lineGap: 0,
    },
    glyphs: {},
    rendering: {
      pixelShape: "circle",
      gapX: 0,
      gapY: 0,
    },
  };
}

const GAMEBOY = ["#a3b334", "#6B882E", "#3A6122", "#0F3810"];

// const colors = {
//   background: "#a3a3a3",
//   text: "#000000",
//   text2: "#475569",
//   border: "#5e5e5e",

//   canvas: {
//     bg1: "#a3a3a3",
//     bg2: "#b0b0b0",
//     border: "#909090",
//     guideline: "#333333",
//     fill: "#000000",
//   },
// };
const colors = {
  background: GAMEBOY[0],
  text: GAMEBOY[3],
  text2: GAMEBOY[2],
  border: GAMEBOY[1],

  canvas: {
    bg1: GAMEBOY[0],
    bg2: GAMEBOY[0],
    border: GAMEBOY[1],
    guideline: GAMEBOY[3],
    fill: GAMEBOY[3],
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
      padding: props.small ? "2px 7px" : "2px 8px",
      // "font-size": "12px",
      // "border-radius": "4px",

      "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
      cursor: "pointer",
      background: props.active ? colors.text : "transparent",
      color: props.active ? colors.background : colors.text,
      border: `2px solid ${colors.text}`,
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
  step?: number;
  min?: number;
  max?: number;
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
        // "font-size": "11px",
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
      step={props.step}
      min={props.min}
      max={props.max}
      style={{
        width: (props.w || 50) + "px",
        background: colors.background,
        border: `2px solid ${colors.border}`,
        // "border-radius": "2px",
        "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
        color: colors.text,
        padding: "2px 4px",
        // "font-size": "11px",
      }}
    />
  </div>
);

type EditorState = {
  selectedGlyphId: string;
  zoom: number;
  showGuides: boolean;
};

const initialEditorState: EditorState = {
  selectedGlyphId: "U+0041",
  zoom: 16,
  showGuides: true,
};

export function PixelFontEditor() {
  const [font, setFont] = createSignal(newYork as FontData);
  const [editorState, setEditorState] = createSignal(initialEditorState);
  const selectedGlyphId = () => editorState().selectedGlyphId;

  const glyph = () => font().glyphs[selectedGlyphId()];

  const updateGlyph = (
    key: any,
    updater: FontDataGlyph | ((prev: FontDataGlyph) => FontDataGlyph),
  ) => {
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

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        height: "100vh",
        background: colors.background,
        color: colors.text,
        "font-family": "Chicago, monospace",
        "font-size": "12px",
        "line-height": "20px",
        "user-select": "none",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <FontSection font={font()} onFontChange={setFont} />

        <GlyphSelectorSection
          font={font()}
          onFontChange={setFont}
          editorState={editorState()}
          onEditorStateChange={setEditorState}
        />

        <Show when={glyph()}>
          <GlyphEditor
            font={font()}
            glyph={glyph()}
            onGlyphChange={(updater) => updateGlyph(selectedGlyphId(), updater)}
            editorState={editorState()}
            onEditorStateChange={setEditorState}
          />
        </Show>
      </div>
      {/* <div
        css={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        style={{
          background: `conic-gradient(transparent 25%, ${colors.text} 0, ${colors.text} 50%, transparent 0, transparent 75%, ${colors.text} 0) 0 0 / 4px 4px`,
        }}
      >
        <div
          css={{ width: 200, height: 200, padding: 8 }}
          style={{
            "background-color": colors.background,
            border: `2px solid ${colors.text2}`,
            "box-shadow": `4px 4px ${colors.text}`,
          }}
        >
          <div>Sorry, your free trial has ended. womp womp :(</div>
        </div>
      </div> */}
    </div>
  );
}

function FontSection(props: {
  font: FontData;
  onFontChange: (font: FontData) => void;
}) {
  const font = () => props.font;

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
        props.onFontChange(JSON.parse(ev.target!.result! as any));
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

  return (
    <div
      style={{
        width: "220px",
        background: colors.background,
        "border-right": `2px solid ${colors.border}`,
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
            props.onFontChange({
              ...props.font,
              meta: { ...props.font.meta, name: e.target.value },
            })
          }
          placeholder="Font name…"
          style={{
            background: "transparent",
            border: `2px solid ${colors.border}`,

            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
            // "border-radius": "4px",
            color: colors.text,
            padding: "2px 6px",
            "font-size": "1em",
            "min-width": 0,
            height: "32px",
            width: "100%",
          }}
        />
      </div>
      <div
        css={{ height: 2, mb: 10 }}
        style={{ "background-color": colors.border }}
      />
      <div css={{ pl: 10 + 8, pr: 10 }}>
        {Object.entries(font().metrics).map(([k, v]) => (
          <NumInput
            label={k}
            value={v}
            onChange={(val) =>
              props.onFontChange({
                ...props.font,
                metrics: { ...props.font.metrics, [k]: +val },
              })
            }
          />
        ))}
      </div>
      {/* x-height ratio typically between 0.6-0.75 (SF Pro Text is 0.73, Electra LT is 0.63) */}

      <div css={{ pl: 10, pr: 10, mt: 12 }}>
        <div
          style={{
            // "font-size": "11px",
            "padding-left": "8px",
            color: colors.text,
            "margin-bottom": "6px",
          }}
        >
          Pixel shape
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          <Btn
            small
            onClick={() =>
              props.onFontChange({
                ...props.font,
                rendering: { ...props.font.rendering, pixelShape: "square" },
              })
            }
            active={font().rendering?.pixelShape !== "circle"}
          >
            Square
          </Btn>
          <Btn
            small
            onClick={() =>
              props.onFontChange({
                ...props.font,
                rendering: { ...props.font.rendering, pixelShape: "circle" },
              })
            }
            active={font().rendering?.pixelShape === "circle"}
          >
            Circle
          </Btn>
        </div>
        <div style={{ "margin-top": "8px", "padding-left": "8px" }}>
          <NumInput
            label="Gap X"
            value={font().rendering?.gapX ?? 0}
            onChange={(val) =>
              props.onFontChange({
                ...props.font,
                rendering: { ...props.font.rendering, gapX: +val },
              })
            }
            step={0.1}
            min={-0.9}
            max={2}
          />
          <NumInput
            label="Gap Y"
            value={font().rendering?.gapY ?? 0}
            onChange={(val) =>
              props.onFontChange({
                ...props.font,
                rendering: { ...props.font.rendering, gapY: +val },
              })
            }
            step={0.1}
            min={-0.9}
            max={2}
          />
        </div>
      </div>

      <div css={{ flex: "1 0 0px" }} />

      <div
        css={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          px: 10,
          pb: 10,
        }}
      >
        <button
          onClick={exportOTF}
          style={{
            padding: "4px 12px",
            // "border-radius": "2px",
            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
            border: `2px solid ${colors.border}`,
            cursor: "pointer",
          }}
        >
          Export OTF
        </button>
        <button
          onClick={saveFont}
          style={{
            padding: "4px 12px",
            // "border-radius": "2px",
            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
            border: `2px solid ${colors.border}`,
            cursor: "pointer",
          }}
        >
          💾 Save font
        </button>
        <label
          style={{
            padding: "4px 12px",
            // "border-radius": "2px",
            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
            border: `2px solid ${colors.border}`,
            cursor: "pointer",
            "text-align": "center",
          }}
        >
          📂 Load font
          <input
            type="file"
            accept=".json"
            onInput={loadFont}
            style={{ display: "none" }}
          />
        </label>
        <button
          onClick={() => props.onFontChange(makeFont())}
          style={{
            padding: "4px 12px",
            // "border-radius": "2px",
            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
            border: `2px solid ${colors.border}`,
            cursor: "pointer",
          }}
        >
          New font
        </button>
      </div>
    </div>
  );
}

function GlyphSelectorSection(props: {
  font: FontData;
  onFontChange: (font: FontData) => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}) {
  const font = () => props.font;
  return (
    <div
      style={{
        // width: "260px",
        background: colors.background,
        "border-right": `2px solid ${colors.border}`,
        display: "flex",
        "flex-direction": "column",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          height: 54,
          display: "flex",
          alignItems: "center",
          px: 10,
        }}
        style={{
          "border-bottom": `2px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            // "font-size": "10px",
            color: colors.text2,
            // "letter-spacing": "1px",
          }}
        >
          CHARACTERS
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 0 10px" }}>
        <For each={CHARACTER_DATA}>
          {(set, i) => (
            <div>
              {i() !== 0 && (
                <div
                  css={{
                    minHeight: "2px",
                    margin: "10px 0 0px",
                    // width: "100%",
                  }}
                  style={{
                    "background-color": colors.border,
                  }}
                />
              )}
              <div css={{ padding: "0 10px" }}>
                <GraphemeSetComp
                  depth={0}
                  set={set}
                  font={props.font}
                  selectedGlyphId={props.editorState.selectedGlyphId}
                  onSelect={(character) => {
                    const codepoint = character.codePointAt(0)!;
                    const key = cpKey(codepoint);
                    const glyph = font().glyphs[key];
                    if (!glyph) {
                      props.onFontChange({
                        ...props.font,
                        glyphs: {
                          ...props.font.glyphs,
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
                      });
                    }
                    props.onEditorStateChange({
                      ...props.editorState,
                      selectedGlyphId: key,
                    });
                  }}
                />
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

function GraphemeSetComp(props: {
  set: CharacterSet;
  selectedGlyphId: string;
  onSelect: (grapheme: string) => void;
  font: FontData;
  depth: number;
}) {
  const graphemesAsArray = createMemo(() => {
    const graphemes: string[] = [];
    if (props.set.characters) {
      for (const ch of props.set.characters) {
        graphemes.push(ch);
      }
    }
    return graphemes;
  });

  const headerStyle = () => {
    let style: JSX.CSSProperties = {
      padding: "0 0px",
      "text-align": props.depth === 0 ? "center" : "left",
      color: props.depth === 0 ? colors.text2 : colors.text,
      "font-weight": props.depth === 1 ? 400 : 400,
      "margin-top": props.depth === 0 ? "10px" : "8px",
      "margin-bottom": props.depth === 0 ? "0px" : "4px",
    };

    return style;
  };

  return (
    <div>
      <div style={headerStyle()}>{props.set.name}</div>
      <Show when={props.set.characters}>
        <div
          style={{
            display: "grid",
            "grid-template-columns": "repeat(10,28px)",
            gap: "2px",
          }}
        >
          <For each={graphemesAsArray()}>
            {(character) => {
              const codepoint = () => character.codePointAt(0)!;
              const key = () => cpKey(codepoint());
              const exists = () =>
                props.font.glyphs[cpKey(character.codePointAt(0)!)]!!;
              const selected = () => key() === props.selectedGlyphId;

              return (
                <button
                  onClick={() => {
                    props.onSelect(character);
                  }}
                  style={{
                    "aspect-ratio": "1",
                    // width: "24px",
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                    padding: "0px",
                    // "font-size": "12px",
                    // "border-radius": "2px",
                    "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
                    cursor: "pointer",
                    border: `2px solid ${selected() ? colors.text : exists() ? colors.text2 : "transparent"}`,
                    background: selected()
                      ? colors.text
                      : exists()
                        ? "transparent"
                        : "transparent",
                    color: selected() ? colors.background : undefined,
                    // opacity: exists() ? 1 : 0.5,
                  }}
                >
                  {character === " " ? "·" : character}
                </button>
              );
            }}
          </For>
        </div>
      </Show>
      <div>
        <Show when={props.set.children}>
          <For each={props.set.children}>
            {(child) => (
              <GraphemeSetComp {...props} depth={props.depth + 1} set={child} />
            )}
          </For>
        </Show>
      </div>
    </div>
  );
}

function GlyphEditor(props: {
  font: FontData;
  glyph: FontDataGlyph;
  onGlyphChange: (updater: (g: FontDataGlyph) => FontDataGlyph) => void;

  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        "flex-direction": "column",
        overflow: "hidden",
      }}
    >
      <GlyphEditorHeader
        glyph={props.glyph}
        onGlyphChange={props.onGlyphChange}
        editorState={props.editorState}
        onEditorStateChange={props.onEditorStateChange}
      />
      <GlyphEditorCanvas
        font={props.font}
        glyph={props.glyph}
        onGlyphChange={props.onGlyphChange}
        editorState={props.editorState}
        onEditorStateChange={props.onEditorStateChange}
      />
      <PreviewSection font={props.font} />
    </div>
  );
}

function sentenceCase(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

function GlyphEditorHeader(props: {
  glyph: FontDataGlyph;
  onGlyphChange: (updater: (g: FontDataGlyph) => FontDataGlyph) => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}) {
  const [unicodeNames] = createResource(async () => {
    return await fetch(unicodeData).then((res) => res.text());
  });
  const glyph = () => props.glyph;
  const glyphOfficialName = () => {
    let data = unicodeNames();
    if (!data) return undefined;
    const codepointStr = props.glyph.codePoint
      .toString(16)
      .toUpperCase()
      .padStart(4, "0");
    const searchStr = "\n" + codepointStr + ";";
    const index = data.indexOf(searchStr);
    if (index === -1) return undefined;
    const endIndex = data.indexOf("\n", index + searchStr.length);
    if (index === -1) return undefined;
    return data.slice(index + searchStr.length, endIndex);
  };

  const clearGlyph = () =>
    props.onGlyphChange((g) => ({
      ...g,
      bitmap: emptyBm(g.width, g.height),
    }));

  return (
    <div
      style={{
        display: "flex",
        background: colors.background,
        height: "54px",
        "border-bottom": `2px solid ${colors.border}`,
        "flex-shrink": 0,
        "align-items": "center",
        padding: "0px 10px",
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
        <div>
          <div
            style={{
              // "font-size": "13px",
              color: colors.text,
              // "min-width": "60px",
              // "text-align": "center",
            }}
          >
            {sentenceCase(glyphOfficialName() || "")}
          </div>
          <div
            style={{
              color: colors.text2,
            }}
          >
            U+{glyph()?.codePoint.toString(16).padStart(4, "0").toUpperCase()}
          </div>
        </div>
      </div>
      <Btn onClick={clearGlyph}>Clear</Btn>
      <Show when={glyph()}>
        <NumInput
          label="Width"
          value={glyph().advanceWidth}
          onChange={(v) =>
            props.onGlyphChange((g) => ({ ...g, advanceWidth: +v }))
          }
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
        <div style={{ display: "flex", "align-items": "center", gap: "5px" }}>
          <span style={{ color: colors.text }}>zoom</span>
          <Slider
            min={12}
            max={52}
            step={2}
            value={props.editorState.zoom}
            onValueChange={(value) =>
              props.onEditorStateChange({
                ...props.editorState,
                zoom: value,
              })
            }
          />
          <span
            style={{
              // "font-size": "11px",
              color: colors.text,
              width: "26px",
            }}
          >
            {props.editorState.zoom}px
          </span>
        </div>
        <Btn
          onClick={() =>
            props.onEditorStateChange({
              ...props.editorState,
              showGuides: !props.editorState.showGuides,
            })
          }
          active={props.editorState.showGuides}
          accent="#0ea5e9"
        >
          Show guides
        </Btn>
      </div>
    </div>
  );
}

function GlyphEditorCanvas(props: {
  font: FontData;
  glyph: FontDataGlyph;
  onGlyphChange: (updater: (g: FontDataGlyph) => FontDataGlyph) => void;
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}) {
  const zoom = () => props.editorState.zoom;
  const showGuides = () => props.editorState.showGuides;
  const font = () => props.font;
  const glyph = () => props.glyph;

  let drawing = false;
  let drawVal = "1";
  let gridRef: HTMLCanvasElement = null!;

  const fontVerticalGuidelines = () => {
    const guides: FontDataGuideline[] = [
      { name: "baseline", offset: 0 },
      { name: "xHeight", offset: font().metrics.xHeight },
      { name: "capHeight", offset: font().metrics.capHeight },
      { name: "ascender", offset: font().metrics.ascender },
      { name: "descender", offset: font().metrics.descender },
    ];

    return guides;
  };
  const fontHorizontalGuidelines = () => {
    const guides: FontDataGuideline[] = [
      { name: "baseline", offset: 0 },
      { name: "width", offset: glyph().advanceWidth },
    ];

    return guides;
  };

  const setPixel = (r: number, c: number, val: string) => {
    props.onGlyphChange((g) => {
      if (g.bitmap[r]?.[c] === val) return g;
      const bm = g.bitmap.slice();
      bm[r] = bm[r].slice(0, c) + val + bm[r].slice(c + 1);
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
    drawVal = glyph().bitmap[r][c] === "1" ? "0" : "1";
    setPixel(r, c, drawVal);
    gridRef.setPointerCapture(e.pointerId);
  };
  const onGridMove = (e: any) => {
    if (!drawing || !glyph()) return;
    const [r, c] = getCell(e);
    if (r >= 0 && r < glyph().height && c >= 0 && c < glyph().width)
      setPixel(r, c, drawVal);
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
    const dp = (n: number) => n * dpr;

    // Set canvas size accounting for device pixel ratio
    canvas.width = dp(w);
    canvas.height = dp(h);
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
    // ctx.strokeStyle = colors.canvas.border;
    // ctx.lineWidth = 2;
    // ctx.setLineDash([2, 2]);
    // for (let row = 1; row < g.height; row++) {
    //   const y = Math.round(row * z * dpr) / dpr + 1 / dpr;
    //   ctx.beginPath();
    //   ctx.moveTo(0, y);
    //   ctx.lineTo(w, y);
    //   ctx.stroke();
    // }
    // for (let c = 1; c < g.width; c++) {
    //   const x = Math.round(c * z * dpr) / dpr + 1 / dpr;
    //   ctx.beginPath();
    //   ctx.moveTo(x, 0);
    //   ctx.lineTo(x, h);
    //   ctx.stroke();
    // }

    // Draw Grid dots
    ctx.fillStyle = colors.canvas.border;
    for (let r = 1; r < g.height; r++) {
      for (let c = 1; c < g.width; c++) {
        if (
          g.bitmap[r - 1][c] === "0" &&
          g.bitmap[r][c - 1] === "0" &&
          g.bitmap[r - 1][c - 1] === "0"
        ) {
          ctx.fillRect(c * z, r * z, 2, 2);
        }
      }
    }

    // Guidelines
    ctx.fillStyle = colors.canvas.border;
    if (showGuides()) {
      for (let row of fontVerticalGuidelines()) {
        const start = row.offset === -1 ? 0 : w / 2;
        const end = row.offset === -1 ? w : g.advanceWidth * z;
        ctx.fillRect(start, (g.height / 2 - row.offset) * z, end, 2);
      }
      for (let column of fontHorizontalGuidelines()) {
        const highestVerticalGuide = Math.max(
          ...fontVerticalGuidelines().map((g) => g.offset),
        );
        const lowestVerticalGuide = Math.min(
          ...fontVerticalGuidelines().map((g) => g.offset),
        );
        const start =
          column.offset === -1 ? 0 : (g.height / 2 - highestVerticalGuide) * z;
        const end =
          column.offset === -1
            ? g.height * z
            : (highestVerticalGuide - lowestVerticalGuide) * z;
        const x = (g.width / 2 + column.offset) * z;
        ctx.fillRect(x, start, 2, end);
      }
    }

    // Draw filled pixels
    ctx.fillStyle = colors.canvas.fill;
    for (let r = 0; r < g.height; r++) {
      for (let c = 0; c < g.width; c++) {
        if (g.bitmap[r][c] === "1") {
          ctx.fillRect(c * z, r * z, z, z);
        }
      }
    }
  });

  return (
    <div
      style={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      <Show when={glyph()}>
        <div
          style={{
            position: "relative",
            transform: `translate(${(glyph().advanceWidth * zoom()) / -2}px, ${(font().metrics.capHeight * zoom()) / 2}px)`,
          }}
        >
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
              "box-shadow": `0 0 0 4px ${colors.border}, 4px 4px 0 4px ${colors.border}`,
              "image-rendering": "pixelated",
            }}
          />
        </div>
      </Show>
    </div>
  );
}

function PreviewSection(props: { font: FontData }) {
  const font = () => props.font;
  const [previewText, setPreviewText] = createSignal(
    "The quick brown fox jumps over the lazy dog.",
  );
  const [previewScale, setPreviewScale] = createSignal(4);
  let previewRef: HTMLCanvasElement = null!;

  // Preview canvas
  createEffect(() => {
    const canvas = previewRef;
    if (!canvas) return;

    const pixelShape = font().rendering?.pixelShape ?? "square";
    const gapX = font().rendering?.gapX ?? 0;
    const gapY = font().rendering?.gapY ?? 0;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    const scale = previewScale();
    const strideX = scale * (1 + gapX);
    const strideY = scale * (1 + gapY);
    const ascender = font().metrics.ascender;
    const decender = font().metrics.descender;
    const lineH = (ascender - decender + 2) * strideY,
      baselineY = (ascender + 1) * strideY;
    let totalW = 8;
    for (const ch of previewText()) {
      const g = font().glyphs[cpKey(ch.codePointAt(0)!)];
      totalW += g ? g.advanceWidth * strideX : 4 * strideX;
    }
    const w = Math.max(totalW, 300);
    const h = lineH;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, baselineY);
    ctx.lineTo(w, baselineY);
    ctx.stroke();
    let x = 0;
    for (const ch of previewText()) {
      const glyph = font().glyphs[cpKey(ch.codePointAt(0)!)];
      if (!glyph) {
        x += 4 * strideX;
        continue;
      }
      const top = baselineY - GLYPH_CANVAS_MIDPOINT * strideY;
      ctx.fillStyle = colors.text;
      for (let canvasRow = 0; canvasRow < glyph.height; canvasRow++)
        for (let canvasColumn = 0; canvasColumn < glyph.width; canvasColumn++)
          if (glyph.bitmap[canvasRow][canvasColumn] === "1") {
            const px = x + (-GLYPH_CANVAS_MIDPOINT + canvasColumn) * strideX;
            const py = top + canvasRow * strideY;
            if (pixelShape === "circle") {
              const radius = scale / 2;
              ctx.beginPath();
              ctx.arc(px + radius, py + radius, radius, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(px, py, scale, scale);
            }
          }
      x += glyph.advanceWidth * strideX;
    }
  });

  return (
    <div
      style={{
        background: colors.background,
        "border-top": `2px solid ${colors.border}`,
        padding: "8px 10px",
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
            // "font-size": 10 + "px",
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
            border: `2px solid ${colors.border}`,
            // "border-radius": 4 + "px",
            color: colors.text,
            padding: "2px 8px",
            // "font-size": 12 + "px",
            "clip-path": `polygon(
              0px calc(100% - 2px), 2px calc(100% - 2px), 2px 100%, 
              calc(100% - 2px) 100%, calc(100% - 2px) calc(100% - 2px), 100% calc(100% - 2px), 
              100% 2px, calc(100% - 2px) 2px, calc(100% - 2px) 0px, 
              2px 0px, 2px 2px, 0px 2px
            )`,
          }}
        />
        <span style={{ color: colors.text2 }}>Font size</span>
        <Slider
          min={2}
          max={16}
          step={1}
          value={previewScale()}
          onValueChange={setPreviewScale}
        />
        <span
          style={{
            color: colors.text,
            width: 40 + "px",
            "text-align": "right",
          }}
        >
          {previewScale() * props.font.metrics.capHeight}px
        </span>
        <span
          style={{
            color: colors.text2,
            width: 30 + "px",
            "text-align": "right",
          }}
        >
          {previewScale()}x
        </span>
      </div>
      <div
        style={{
          overflow: "auto",
          background: colors.canvas.bg2,
          "border-radius": 4 + "px",
          padding: "4px 0",
          "max-height": "33vh",
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
