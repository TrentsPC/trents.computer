// -------------------------------------------------------------------------------------------------
// Views
// -------------------------------------------------------------------------------------------------

export function getWeekView(date: Date, startOfWeek: number) {
  return getDateInterval(getStartOfWeek(date, startOfWeek), getEndOfWeek(date, startOfWeek));
}

export type MonthViewItem = {
  date: Date;
  isWeekend: boolean;
  outsideMonth: boolean;
};

export function getMonthView(date: Date, startOfWeek: number): MonthViewItem[] {
  let start = getStartOfMonth(date);
  start = getStartOfWeek(start, startOfWeek);
  let end = new Date(start);
  end.setDate(end.getDate() + 7 * 6 - 1);

  const dates = getDateInterval(start, end);
  return dates.map((d) => ({
    date: d,
    isWeekend: isWeekend(d),
    outsideMonth: d.getMonth() !== date.getMonth(),
  }));
}

export function getYearView(date: Date, startOfWeek: number) {
  const months: ReturnType<typeof getMonthView>[] = [];

  const year = date.getFullYear();

  for (let i = 0; i < 12; i++) {
    const month = getMonthView(new Date(year, i, 1), startOfWeek);
    months.push(month);
  }

  return months;
}

// -------------------------------------------------------------------------------------------------
// Utils
// -------------------------------------------------------------------------------------------------

export function sameMonth(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
}

export function sameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

export function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getStartOfWeek(date: Date, startOfWeek: number) {
  const result = new Date(date);

  const diff = getWeekdayOffset(result, startOfWeek);

  return new Date(result.setDate(result.getDate() - diff));
}

export function getEndOfWeek(date: Date, startOfWeek: number) {
  const result = new Date(date);

  const diff = getWeekdayOffset(result, startOfWeek);

  return new Date(result.setDate(result.getDate() - diff + 6));
}

export function toString(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

// -------------------------------------------------------------------------------------------------
// Private utils
// -------------------------------------------------------------------------------------------------

function getDateInterval(start: Date, end: Date) {
  const dates: Date[] = [];

  if (end.getTime() < start.getTime()) {
    return dates;
  }

  const currentDate = new Date(start);

  while (!sameDate(currentDate, end)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  dates.push(new Date(currentDate));

  return dates;
}

function getWeekdayOffset(date: Date, startOfWeek: number) {
  let currentDay = date.getDay();
  if (currentDay < startOfWeek) {
    currentDay += 7;
  }
  return currentDay - startOfWeek;
}
