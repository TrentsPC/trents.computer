import { styled } from "@hypergood/css";
import { createFileRoute } from "@tanstack/solid-router";
import { Component, createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { getDefaultSegment, getPossibleNextSegments, getSegmentName } from "~/modules/iso-8601";
import { describeDTRoot } from "~/modules/iso-8601/describers";
import { formatDTNode } from "~/modules/iso-8601/formatters";
import {
  DTCentury,
  DTDayOfMonth,
  DTDecade,
  DTGroupingOfYear,
  DTHour,
  DTMonthOfYear,
  DTNode,
  DTRoot,
  DTYear,
} from "~/modules/iso-8601/types";

export const Route = createFileRoute("/iso")({
  component: Iso,
});

function Iso() {
  const [value, setValue] = createSignal<DTRoot>({
    type: "root",
    next: undefined,
  });
  return (
    <div>
      Let's make an ISO 8601 compliant date-time!
      <Display value={value()} />
      <div
        css={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: "auto 1fr",
          gridAutoColumns: 300,
          backgroundColor: "#f6f6f6",
          // columnGap: 1,
        }}
      >
        <RootEditor value={value()} onValueChange={setValue} />
      </div>
    </div>
  );
}

function Display(props: { value: DTRoot }) {
  return (
    <div css={{ minH: 200 }}>
      <BigText>{formatDTNode(props.value)}</BigText>
      <div css={{ fontSize: 13, lineHeight: "20px", align: "center" }}>
        {describeDTRoot(props.value)}
      </div>
    </div>
  );
}

function BigText(props: { children: string }) {
  let ref: HTMLDivElement = undefined!;
  createEffect(() => {
    function calculateSize() {
      props.children;
      const currentFontSize = parseInt(window.getComputedStyle(ref).fontSize);
      const currentWidth = ref.offsetWidth;
      const containerWidth = ref.parentElement!.offsetWidth;
      const scale = containerWidth / currentWidth;
      const newFontSize = currentFontSize * scale;

      const maxFontSize = 250;

      if (isFinite(newFontSize)) {
        ref.style.fontSize = `${Math.min(newFontSize, maxFontSize)}px`;
      }
    }
    window.addEventListener("resize", calculateSize);
    calculateSize();
    onCleanup(() => {
      window.removeEventListener("resize", calculateSize);
    });
  });
  return (
    <div css={{ align: "center", overflow: "hidden", lineHeight: 1 }}>
      <span ref={ref} css={{ whiteSpace: "nowrap" }}>
        {props.children}
      </span>
    </div>
  );
}

function RootEditor(props: { value: DTRoot; onValueChange: (value: DTRoot) => void }) {
  return (
    <>
      <Column>
        Starting Segment:
        <NextSegmentSelector
          thisSegment={props.value.type as DTNode["type"]}
          nextSegment={(props.value.next?.type || "") as DTNode["type"]}
          onSelect={(node) => {
            props.onValueChange({
              ...props.value,
              next: node as any,
            });
          }}
        />
      </Column>
      <NodeEditor
        value={props.value.next}
        onValueChange={(next) =>
          props.onValueChange({
            ...props.value,
            next,
          })
        }
      />
    </>
  );
}

function NextSegmentSelector(props: {
  thisSegment: DTNode["type"];
  nextSegment: DTNode["type"];
  onSelect: (node: DTNode) => void;
}) {
  const nextSegments = () => getPossibleNextSegments(props.thisSegment);
  return (
    <Show when={nextSegments().length > 0} fallback={<div>No more segments</div>}>
      <select
        value={props.nextSegment}
        onChange={(e) => {
          const nextSegment = e.currentTarget.value;
          const segment = getDefaultSegment(nextSegment as any);
          props.onSelect(segment);
        }}
      >
        <option disabled selected>
          Select a segment
        </option>
        <option value="">None</option>
        <For each={nextSegments()}>
          {(segmentType) => <option value={segmentType}>{getSegmentName(segmentType)}</option>}
        </For>
      </select>
    </Show>
  );
}

function NextSegmentEditor(props: {
  thisSegment: DTNode;
  onNextSegmentChange: (node: DTNode | undefined) => void;
}) {
  return (
    <>
      <Column>
        Next piece:
        <NextSegmentSelector
          thisSegment={props.thisSegment.type}
          nextSegment={(props.thisSegment.next?.type || "") as DTNode["type"]}
          onSelect={(node) => {
            props.onNextSegmentChange(node);
          }}
        />
      </Column>
      <NodeEditor
        value={props.thisSegment.next as DTMonthOfYear}
        onValueChange={(value) => {
          props.onNextSegmentChange(value);
        }}
      />
      {/* <Switch>
        <Match when={props.thisSegment.next?.type === "monthOfYear"}>
          <MonthOfYearEditor
            value={props.thisSegment.next as DTMonthOfYear}
            onValueChange={(value) => {
              props.onNextSegmentChange(value);
            }}
          />
        </Match>
      </Switch> */}
    </>
  );
}

type NodeEditorProps<Node extends DTNode = any> = {
  value: Node;
  onValueChange: (value: Node) => void;
};

const allTheNodeEditors: Record<DTNode["type"], Component<NodeEditorProps>> = {
  root: () => null,
  century: CenturyEditor,
  decade: DecadeEditor,
  year: YearEditor,
  monthOfYear: MonthOfYearEditor,
  groupingOfYear: GroupingOfYearEditor,
  dayOfMonth: DayOfMonthEditor,
  dayOfYear: () => null,
  weekOfYear: () => null,
  hour: HourEditor,
};

function NodeEditor(props: NodeEditorProps) {
  const Editor = () => allTheNodeEditors[props.value?.type as DTNode["type"]];
  return <Dynamic component={Editor()} {...props} />;
}

function CenturyEditor(props: NodeEditorProps<DTCentury>) {
  return (
    <Column>
      Century:
      <input
        type="number"
        value={props.value.value.value}
        onChange={(e) => {
          const nextValue = e.currentTarget.value;
          props.onValueChange({
            ...props.value,
            value: {
              ...props.value.value,
              value: Number(nextValue),
            },
          });
        }}
      />
      <div>
        <input
          type="checkbox"
          checked={props.value.value.approximate}
          onChange={(e) =>
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                approximate: e.currentTarget.checked,
              },
            })
          }
        />
        Approximate?
      </div>
      <div>
        <input
          type="checkbox"
          checked={props.value.value.uncertain}
          onChange={(e) =>
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                uncertain: e.currentTarget.checked,
              },
            })
          }
        />
        Dubious?
      </div>
    </Column>
  );
}

function DecadeEditor(props: NodeEditorProps<DTDecade>) {
  return (
    <Column>
      Decade:
      <input
        type="number"
        value={props.value.value.value}
        onChange={(e) => {
          const nextValue = e.currentTarget.value;
          props.onValueChange({
            ...props.value,
            value: {
              ...props.value.value,
              value: Number(nextValue),
            },
          });
        }}
      />
      <div>
        <input
          type="checkbox"
          checked={props.value.value.approximate}
          onChange={(e) =>
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                approximate: e.currentTarget.checked,
              },
            })
          }
        />
        Approximate?
      </div>
      <div>
        <input
          type="checkbox"
          checked={props.value.value.uncertain}
          onChange={(e) =>
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                uncertain: e.currentTarget.checked,
              },
            })
          }
        />
        Dubious?
      </div>
    </Column>
  );
}

function YearEditor(props: { value: DTYear; onValueChange: (value: DTYear) => void }) {
  return (
    <>
      <Column>
        Year:
        <input
          type="number"
          value={props.value.value.value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                value: Number(nextValue),
              },
            });
          }}
        />
        <br />
        Significant Digits:
        <input
          type="number"
          value={props.value.value.significantDigits}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                significantDigits: Number(nextValue),
              },
            });
          }}
        />
        <br />
        Unspecified Digits:
        <input
          type="number"
          value={props.value.value.unspecifiedDigits}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                unspecifiedDigits: Number(nextValue),
              },
            });
          }}
        />
        <div>
          <input
            type="checkbox"
            checked={props.value.value.approximate}
            onChange={(e) =>
              props.onValueChange({
                ...props.value,
                value: {
                  ...props.value.value,
                  approximate: e.currentTarget.checked,
                },
              })
            }
          />
          Approximate?
        </div>
        <div>
          <input
            type="checkbox"
            checked={props.value.value.uncertain}
            onChange={(e) =>
              props.onValueChange({
                ...props.value,
                value: {
                  ...props.value.value,
                  uncertain: e.currentTarget.checked,
                },
              })
            }
          />
          Dubious?
        </div>
      </Column>
      <NextSegmentEditor
        thisSegment={props.value}
        onNextSegmentChange={(node) => {
          props.onValueChange({
            ...props.value,
            next: node as any,
          });
        }}
      />
    </>
  );
}

function MonthOfYearEditor(props: {
  value: DTMonthOfYear;
  onValueChange: (value: DTMonthOfYear) => void;
}) {
  return (
    <>
      <Column>
        Month:
        <input
          type="number"
          value={props.value.value.value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                value: Number(nextValue),
              },
            });
          }}
        />
      </Column>
      <NextSegmentEditor
        thisSegment={props.value}
        onNextSegmentChange={(node) => {
          props.onValueChange({
            ...props.value,
            next: node as any,
          });
        }}
      />
    </>
  );
}

function GroupingOfYearEditor(props: {
  value: DTGroupingOfYear;
  onValueChange: (value: DTGroupingOfYear) => void;
}) {
  return (
    <>
      <Column>
        Grouping:
        <select
          value={props.value.value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: Number(nextValue),
            });
          }}
        >
          <option value="21">Spring (independent of location)</option>
          <option value="22">Summer (independent of location)</option>
          <option value="23">Autumn (independent of location)</option>
          <option value="24">Winter (independent of location)</option>
          <option value="25">Spring — Northern Hemisphere</option>
          <option value="26">Summer — Northern Hemisphere</option>
          <option value="27">Autumn — Northern Hemisphere</option>
          <option value="28">Winter — Northern Hemisphere</option>
          <option value="29">Spring — Southern Hemisphere</option>
          <option value="30">Summer — Southern Hemisphere</option>
          <option value="31">Autumn — Southern Hemisphere</option>
          <option value="32">Winter — Southern Hemisphere</option>
          <option value="33">Quarter 1 (3 months in duration)</option>
          <option value="34">Quarter 2 (3 months in duration)</option>
          <option value="35">Quarter 3 (3 months in duration)</option>
          <option value="36">Quarter 4 (3 months in duration)</option>
          <option value="37">Quadrimester 1 (4 months in duration)</option>
          <option value="38">Quadrimester 2 (4 months in duration)</option>
          <option value="39">Quadrimester 3 (4 months in duration)</option>
          <option value="40">Semestral 1 (6 months in duration)</option>
          <option value="41">Semestral 2 (6 months in duration)</option>
        </select>
      </Column>
      {/* <NextSegmentEditor
        thisSegment={props.value}
        onNextSegmentChange={(node) => {
          props.onValueChange({
            ...props.value,
            next: node as any,
          });
        }}
      /> */}
    </>
  );
}

function DayOfMonthEditor(props: {
  value: DTDayOfMonth;
  onValueChange: (value: DTDayOfMonth) => void;
}) {
  return (
    <>
      <Column>
        Day:
        <input
          type="number"
          value={props.value.value.value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                value: Number(nextValue),
              },
            });
          }}
        />
      </Column>
    </>
  );
}

function HourEditor(props: { value: DTHour; onValueChange: (value: DTHour) => void }) {
  return (
    <>
      <Column>
        Year:
        <input
          type="number"
          value={props.value.value.value}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            props.onValueChange({
              ...props.value,
              value: {
                ...props.value.value,
                value: Number(nextValue),
              },
            });
          }}
        />
      </Column>
    </>
  );
}

const Column = styled("div", {
  width: 300,
  borderLeft: "1px solid rgba(0, 0, 0, 0.18)",
  px: 10,
});
