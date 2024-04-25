import { JSX } from "solid-js";
import { colors } from "~/theme.styles";
import { useSquircle } from "~/utils/squircle";

export type FullDate = {
  era: "BC" | "AD";
  year: number;
  month?: number;
  day?: number;
  hour?: number;
};

const MIN_DATE: FullDate = {
  era: "BC",
  year: 4,
  month: 6,
};

const MAX_DATE: FullDate = {
  era: "AD",
  year: 33,
  month: 4,
  day: 3,
  hour: 15,
};
const MAX_DATE_DAYS = daysSinceAD(offsetDate(MAX_DATE));

export type SlideHeaderProps = {
  date: FullDate;
  minDate?: FullDate;
  breadcrumbs?: string[];
  title: string;
  dateStr?: JSX.Element;
};

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

export function SlideHeader(props: SlideHeaderProps) {
  const days = () => daysSinceAD(offsetDate(props.date));
  const minDays = () => daysSinceAD(offsetDate(props.minDate ?? MIN_DATE));
  return (
    <div
      css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        d: "flex",
        justify: "space-between",
        fontSize: "2vw",
        px: "2vw",
        py: "1.5vw",
        fontWeight: 500,
      }}
    >
      {props.minDate && (
        <div
          ref={useSquircle()}
          css={{
            bg: colors.slate6,
            position: "absolute",
            top: "1vw",
            left: "1vw",
            bottom: "1vw",
            zIndex: 0,
            r: "1vw",
          }}
          style={{
            width: `${(days() / MAX_DATE_DAYS) * 98}vw`,
          }}
        />
      )}
      <div
        ref={useSquircle()}
        css={{
          bg: colors.slate7,
          position: "absolute",
          top: "1vw",
          left: "1vw",
          bottom: "1vw",
          zIndex: 0,
          r: "1vw",
        }}
        style={{
          left: `${(minDays() / MAX_DATE_DAYS) * 98 + 1}vw`,
          width: `${((days() - minDays()) / MAX_DATE_DAYS) * 98}vw`,
        }}
      />
      <div css={{ zIndex: 1 }}>
        {props.breadcrumbs && (
          <span css={{ color: colors.slateA11 }}>
            {props.breadcrumbs.join(" – ")}
            {" – "}
          </span>
        )}
        <span>{props.title}</span>
      </div>
      <div css={{ d: "flex", zIndex: 1 }}>
        {props.dateStr ? props.dateStr : formatDate(props.date)}
      </div>
    </div>
  );
}

/**
 * Offset all dates by four years so that the origin is at 4 BC.
 */
function offsetDate(date: FullDate): FullDate {
  if (date.era === "AD") {
    date = {
      ...date,
      year: date.year + MIN_DATE.year,
    };
  } else {
    date = {
      ...date,
      era: "AD",
      year: MIN_DATE.year + 1 - date.year,
    };
  }

  if (date.month) {
    date = {
      ...date,
      month: date.month - MIN_DATE.month! + 1,
    };
    while (date.month! < 1) {
      date = {
        ...date,
        month: date.month! + 12,
        year: date.year - 1,
      };
    }
  }

  return date;
}

function daysSinceAD(date: FullDate) {
  let days = 0;
  for (let i = 1; i < date.year; i++) {
    days += 365;
    if (i % 4 === 0) {
      days++;
    }
  }
  if (date.month != undefined) {
    for (let i = 1; i < date.month; i++) {
      days += 30;
    }
  }
  if (date.day != undefined) {
    days += date.day;
  }
  return days;
}

function formatDate(date: FullDate) {
  let str = "";
  if (date.hour != null) {
    str += `${date.hour % 12 || 12}:00`;
    str += date.hour < 12 ? "AM" : "PM";
    str += " –";
  }
  if (date.day) {
    str += ` ${date.day}`;
  }
  if (date.month) {
    str += ` ${MONTHS[date.month - 1]},`;
  }
  if (date.year) {
    str += ` ${date.year}`;
  }
  str += ` ${date.era}`;
  return str.trim();
}
