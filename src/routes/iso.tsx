import { styled } from "@hypergood/css";
import { createSignal, Match, Switch } from "solid-js";
import {
  DTDayOfMonth,
  DTHour,
  DTMonthOfYear,
  DTNode,
  DTRoot,
  DTYear,
} from "~/modules/iso-8601/types";

export default function Iso() {
  const [value, setValue] = createSignal<DTRoot>({
    type: "root",
    value: undefined,
  });
  return (
    <div>
      Let's make an ISO 8601 compliant date-time!
      <div css={{ fontSize: 32 }}>{formatDTRoot(value())}</div>
      <pre>
        <code>{JSON.stringify(value(), null, 2)}</code>
      </pre>
      <div
        css={{ display: "grid", gridAutoFlow: "column", gap: 10, gridRows: 2 }}
      >
        <RootEditor value={value()} onValueChange={setValue} />
      </div>
    </div>
  );
}

function RootEditor(props: {
  value: DTRoot;
  onValueChange: (value: DTRoot) => void;
}) {
  return (
    <>
      <Column>
        Type:
        <select
          value={props.value.value?.type || ""}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            if (nextValue === "year") {
              const year = getDefaultYear();
              props.onValueChange({
                type: "root",
                value: year,
              });
              return;
            }
            if (nextValue === "hour") {
              const hour = getDefaultHour();
              props.onValueChange({
                type: "root",
                value: hour,
              });
              return;
            }
          }}
        >
          <option disabled selected>
            Select a type
          </option>
          <option value="hour">Time</option>
          <option value="year">Date-Time</option>
        </select>
      </Column>
      <Switch>
        <Match when={props.value.value?.type === "year"}>
          <YearEditor
            value={props.value.value as DTYear}
            onValueChange={(value) => {
              props.onValueChange({
                ...props.value,
                value,
              });
            }}
          />
        </Match>
        <Match when={props.value.value?.type === "hour"}>
          <HourEditor
            value={props.value.value as DTHour}
            onValueChange={(value) => {
              props.onValueChange({
                ...props.value,
                value,
              });
            }}
          />
        </Match>
      </Switch>
    </>
  );
}

function YearEditor(props: {
  value: DTYear;
  onValueChange: (value: DTYear) => void;
}) {
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
      <Column>
        Next piece:
        <select
          value={props.value.next?.type || ""}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            if (nextValue === "monthOfYear") {
              const year = getDefaultMonthOfYear();
              props.onValueChange({
                ...props.value,
                next: year,
              });
              return;
            }
            // if (nextValue === "hour") {
            //   const hour = getDefaultHour();
            //   props.onValueChange({
            //     type: "root",
            //     value: hour,
            //   });
            //   return;
            // }
          }}
        >
          <option disabled selected>
            Select a type
          </option>
          <option value="">None</option>
          <option value="monthOfYear">Month</option>
        </select>
      </Column>
      <Switch>
        <Match when={props.value.next?.type === "monthOfYear"}>
          <MonthOfYearEditor
            value={props.value.next as DTMonthOfYear}
            onValueChange={(value) => {
              props.onValueChange({
                ...props.value,
                next: value,
              });
            }}
          />
        </Match>
      </Switch>
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
      <Column>
        Next piece:
        <select
          value={props.value.next?.type || ""}
          onChange={(e) => {
            const nextValue = e.currentTarget.value;
            if (nextValue === "dayOfMonth") {
              const year = getDefaultDayOfMonth();
              props.onValueChange({
                ...props.value,
                next: year,
              });
              return;
            }
            // if (nextValue === "hour") {
            //   const hour = getDefaultHour();
            //   props.onValueChange({
            //     type: "root",
            //     value: hour,
            //   });
            //   return;
            // }
          }}
        >
          <option disabled selected>
            Select a type
          </option>
          <option value="">None</option>
          <option value="dayOfMonth">Day</option>
        </select>
      </Column>
      <Switch>
        <Match when={props.value.next?.type === "dayOfMonth"}>
          <DayOfMonthEditor
            value={props.value.next as DTDayOfMonth}
            onValueChange={(value) => {
              props.onValueChange({
                ...props.value,
                next: value,
              });
            }}
          />
        </Match>
      </Switch>
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

function HourEditor(props: {
  value: DTHour;
  onValueChange: (value: DTHour) => void;
}) {
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

function getDefaultYear(): DTYear {
  return {
    type: "year",
    value: {
      value: 2025,
      significantDigits: 0,
      approximate: false,
      uncertain: false,
      unspecifiedDigits: 0,
    },
  };
}

function getDefaultMonthOfYear(): DTMonthOfYear {
  return {
    type: "monthOfYear",
    value: {
      value: 1,
      significantDigits: 0,
      approximate: false,
      uncertain: false,
      unspecifiedDigits: 0,
    },
  };
}

function getDefaultDayOfMonth(): DTDayOfMonth {
  return {
    type: "dayOfMonth",
    value: {
      value: 1,
      significantDigits: 0,
      approximate: false,
      uncertain: false,
      unspecifiedDigits: 0,
    },
  };
}

function getDefaultHour(): DTHour {
  return {
    type: "hour",
    value: {
      value: 0,
      significantDigits: 0,
      approximate: false,
      uncertain: false,
      unspecifiedDigits: 0,
    },
  };
}

const Column = styled("div", {
  width: 300,
  // borderRight: "1px solid #ccc",
  padding: 10,
});

function formatDTNode(node: DTNode): string {
  switch (node.type) {
    case "root":
      return formatDTRoot(node);
    case "year":
      return formatDTYear(node);
    case "monthOfYear":
      return formatDTMonthOfYear(node);
  }
  return "";
}

function formatDTRoot(node: DTRoot): string {
  return node.value ? formatDTNode(node.value) : "";
}

function formatDTYear(node: DTYear): string {
  const next = node.next ? "-" + formatDTNode(node.next) : "";
  let value = node.value.value.toFixed();
  if (node.value.approximate && node.value.uncertain) {
    value = `%${value}`;
  } else {
    if (node.value.approximate) value = `~${value}`;
    if (node.value.uncertain) value = `?${value}`;
  }

  return `${value}${next}`;
}

function formatDTMonthOfYear(node: DTMonthOfYear): string {
  const next = node.next ? "-" + formatDTNode(node.next) : "";
  let value = node.value.value.toFixed();
  if (node.value.approximate && node.value.uncertain) {
    value = `%${value}`;
  } else {
    if (node.value.approximate) value = `~${value}`;
    if (node.value.uncertain) value = `?${value}`;
  }

  return `${value}${next}`;
}
