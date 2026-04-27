import { createSignal, For, Show } from "solid-js";
import { CALENDAR_EVENTS } from "~/modules/calendar";
import { sameDate } from "~/modules/calendar/utils";
import { colors } from "~/theme.styles";
import { LargeTitle } from "../ui/typography";

const [cursor, setCursor] = createSignal(new Date());
const [view, setView] = createSignal<"month" | "year">("year");

export default function MessageComponent() {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
      }}
    >
      <Show when={view() === "month"}>
        <MonthView cursor={cursor()} />
      </Show>
      <Show when={view() === "year"}>
        <YearView cursor={cursor()} />
      </Show>
    </div>
  );
}

function YearView(props: { cursor: Date }) {
  const months = Array.from({ length: 12 }).map((_, i) => i);
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        px: 20,
        pt: "var(--safe-area-inset-top)",
        pb: "var(--safe-area-inset-bottom)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LargeTitle css={{ fontWeight: 700 }}>{props.cursor.getFullYear()}</LargeTitle>
      <div css={{ display: "grid", gridCols: 3, flex: "1 0 0px", gap: 10 }}>
        <For each={months}>
          {(month) => <Month cursor={new Date(props.cursor.getFullYear(), month)} />}
        </For>
      </div>
    </div>
  );
}

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const LONG_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(cursor: Date) {
  const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const month = start.getMonth();

  const dates = [];
  while (start.getMonth() === month) {
    dates.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return dates;
}

function getBlanks(cursor: Date) {
  const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  start.setDate(start.getDate() - 1);

  const blanks = [];

  while (start.getDay() !== 0) {
    blanks.push(new Date(start));
    start.setDate(start.getDate() - 1);
  }
  return blanks.reverse();
}

function Month(props: { cursor: Date }) {
  const idx = () => props.cursor.getMonth();

  const dates = () => getDaysInMonth(props.cursor);
  const blanks = () => getBlanks(props.cursor);

  return (
    <div
      onClick={() => {
        setCursor(new Date(props.cursor));
        setView("month");
      }}
      css={{ flex: "1 0 0px", display: "flex", flexDirection: "column" }}
    >
      <div>{SHORT_MONTH_NAMES[idx()]}</div>
      <div css={{ display: "grid", gridCols: 7, gap: 0, fontSize: 12 }}>
        {blanks().map((date) => (
          <div></div>
        ))}
        {dates().map((date) => (
          <div>{date.getDate()}</div>
        ))}
      </div>
    </div>
  );
}

function MonthView(props: { cursor: Date }) {
  const idx = () => props.cursor.getMonth();

  const dates = () => getDaysInMonth(props.cursor);
  const blanks = () => getBlanks(props.cursor);

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        // px: 20,
        pt: "var(--safe-area-inset-top)",
        pb: "var(--safe-area-inset-bottom)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        // onClick={() => {
        //   setCursor(new Date(props.cursor));
        //   setView("month");
        // }}
        css={{ flex: "1 0 0px", display: "flex", flexDirection: "column" }}
      >
        <div
          onClick={() => {
            setView("year");
          }}
        >
          <LargeTitle css={{ fontWeight: 700 }}>{LONG_MONTH_NAMES[idx()]}</LargeTitle>
        </div>
        <div
          css={{
            display: "grid",
            gridCols: 7,
            gap: 0,
            fontSize: 12,
            flex: "1 0 0px",
            boxShadow: `inset 0 1px ${colors.gray5}`,
          }}
        >
          {blanks().map((date) => (
            <div></div>
          ))}
          {dates().map((date) => {
            const events = () => CALENDAR_EVENTS.filter((event) => sameDate(event.date, date));
            return (
              <div css={{ boxShadow: `inset 0 1px ${colors.gray5}` }}>
                {date.getDate()}
                <div css={{ spaceY: 1, px: 2.5 }}>
                  <For each={events()}>
                    {(event) => (
                      <div css={{ d: "flex", h: 16, items: "center", px: 2.5 }}>
                        {/* <div
                          css={{
                            r: 5,
                            h: 5,
                            w: 5,
                            bg: "#59a8d7",
                            mr: 5,
                            flexShrink: 0,
                          }}
                        /> */}
                        <span
                          css={{
                            fontSize: 12,
                            lineClamp: 1,
                          }}
                        >
                          {event.name}
                        </span>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
