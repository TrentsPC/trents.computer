import { For, createSignal } from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon } from "solid-radix-icons";
import { IconPushButton, PushButton } from "~/components/macos-ui/PushButton";
import { colors } from "~/theme.styles";
import { getMonthView, sameDate } from "./utils";

type CalendarView = "year" | "month" | "week" | "day";

const DATES: Record<string, Date> = {
  // IBM: new Date("2023-03-04T00:00:00+13:00"),
  // Falafel: new Date("2023-04-01T23:00:00+13:00"),
  // Break: new Date(1715509620000), // 10:27pm 2024-05-12 nz time

  Reunion: new Date("2024-05-31T23:00:00+12:00"),
  Christchurch: new Date("2025-02-15T20:00:00+13:00"),
};

const MILESTONES = {
  days: [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000],
  weeks: [10, 20, 30, 40, 50, 60, 69, 70, 80, 90, 100],
  months: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 18, 20, 30, 40, 50, 70, 80, 90, 100,
  ],
  years: [1, 2, 3, 4, 5],
};

type Event = {
  name: string;
  date: Date;
};

function createEvents() {
  const events: Event[] = [];
  for (const [name, date] of Object.entries(DATES)) {
    events.push({ name, date });
    for (const [unit, milestones] of Object.entries(MILESTONES)) {
      for (const milestone of milestones) {
        const newDate = new Date(date);
        switch (unit) {
          case "days":
            newDate.setDate(newDate.getDate() + milestone);
            events.push({
              name: `${milestone} days since ${name}`,
              date: newDate,
            });
            break;
          case "weeks":
            newDate.setDate(newDate.getDate() + milestone * 7);
            events.push({
              name: `${milestone} weeks since ${name}`,
              date: newDate,
            });
            break;
          case "months":
            newDate.setMonth(newDate.getMonth() + milestone);
            events.push({
              name: `${milestone} months since ${name}`,
              date: newDate,
            });
            break;
          case "years":
            newDate.setFullYear(newDate.getFullYear() + milestone);
            events.push({
              name: `${milestone} ${
                milestone === 1 ? "year" : "years"
              } since ${name}`,
              date: newDate,
            });
            break;
        }
      }
    }
  }
  return events;
}

const EVENTS = createEvents();

const MONTHS = [
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

const MONTHS_SHORT = MONTHS.map((month) => month.slice(0, 3));

export function Calendar() {
  const [cursor, setCursor] = createSignal(new Date());
  const [view, setView] = createSignal<CalendarView>("month");

  const days = () => getMonthView(cursor(), 1);

  return (
    <div
      css={{ h: "100%", d: "flex", flexDir: "column", fontFamily: "system-ui" }}
    >
      {/* <div css={{ h: 36, d: "flex" }}></div> */}
      <div css={{ h: 82, d: "flex", flexDir: "column" }}>
        <div css={{ flex: 1, d: "flex", items: "center", px: 13 }}>
          <p
            css={{
              fontSize: 30,
              fontWeight: 300,
            }}
          >
            <span css={{ fontWeight: 700 }}>{MONTHS[cursor().getMonth()]}</span>{" "}
            {cursor().getFullYear()}
          </p>
          <div css={{ flex: 1 }} />

          <div css={{ d: "flex", gap: 1 }}>
            <IconPushButton
              onClick={() => {
                let newDate = new Date(cursor());
                newDate.setMonth(newDate.getMonth() - 1);
                setCursor(newDate);
              }}
            >
              <ChevronLeftIcon />
            </IconPushButton>
            <PushButton
              style={{ width: "63px" }}
              onClick={() => setCursor(new Date())}
            >
              Today
            </PushButton>
            <IconPushButton
              onClick={() => {
                let newDate = new Date(cursor());
                newDate.setMonth(newDate.getMonth() + 1);
                setCursor(newDate);
              }}
            >
              <ChevronRightIcon />
            </IconPushButton>
          </div>
        </div>
        <div
          css={{
            display: "grid",
            gap: 1,
            gridCols: 7,
          }}
        >
          <For each={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}>
            {(item) => (
              <div
                css={{
                  fontSize: 15,
                  lineHeight: 1,
                  fontWeight: 300,
                  pb: 9,
                  pr: 8,
                  justifySelf: "end",
                  textAlign: "right",
                  d: "flex",
                  items: "center",
                }}
              >
                {item}
              </div>
            )}
          </For>
        </div>
      </div>
      <div
        css={{
          flex: "1 0 0px",
          display: "grid",
          gap: 1,
          gridCols: 7,
          gridAutoRows: "1fr",
          borderTop: `1px solid ${colors.separator}`,
          bg: colors.separator,
        }}
      >
        <For each={days()}>
          {(item) => {
            const events = () =>
              EVENTS.filter((event) => sameDate(event.date, item.date));
            return (
              <div css={{ bg: "white" }}>
                <div
                  css={{
                    d: "flex",
                    justify: "flex-end",
                    p: 3,
                    fontSize: 15,
                    lineHeight: "26px",
                  }}
                >
                  <div
                    css={{
                      lineHeight: "26px",
                      minW: "26px",
                      textAlign: "center",
                      px: 8,
                    }}
                  >
                    {item.date.getDate()}
                    {item.date.getDate() === 1 &&
                      ` ${MONTHS_SHORT[item.date.getMonth()]}`}
                  </div>
                </div>
                <div css={{ spaceY: 1, px: 2.5 }}>
                  <For each={events()}>
                    {(event) => (
                      <div css={{ d: "flex", h: 16, items: "center", px: 2.5 }}>
                        <div
                          css={{
                            r: 5,
                            h: 5,
                            w: 5,
                            bg: "#59a8d7",
                            mr: 5,
                            flexShrink: 0,
                          }}
                        />
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
          }}
        </For>
      </div>
    </div>
  );
}
