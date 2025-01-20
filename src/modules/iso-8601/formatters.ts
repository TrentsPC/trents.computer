import {
  DTCentury,
  DTComponent,
  DTDayOfMonth,
  DTDecade,
  DTGroupingOfYear,
  DTMonthOfYear,
  DTNode,
  DTRoot,
  DTYear,
} from "./types";

export function formatDTNode(node: DTNode): string {
  switch (node.type) {
    case "root":
      return formatDTRoot(node);
    case "century":
      return formatDTCentury(node);
    case "decade":
      return formatDTDecade(node);
    case "year":
      return formatDTYear(node);
    case "monthOfYear":
      return formatDTMonthOfYear(node);
    case "dayOfMonth":
      return formatDTDayOfMonth(node);
    case "groupingOfYear":
      return formatDTGroupingOfYear(node);
  }
  return "";
}

function formatDTRoot(node: DTRoot): string {
  return node.next ? formatDTNode(node.next) : "";
}

function formatDTCentury(node: DTCentury): string {
  let value = formatDTComponent(node.value, 2);
  return value;
}

function formatDTDecade(node: DTDecade): string {
  let value = formatDTComponent(node.value, 3);
  return value;
}

function formatDTYear(node: DTYear): string {
  const next = node.next ? "-" + formatDTNode(node.next) : "";
  let value = formatDTComponent(node.value, 4);

  return `${value}${next}`;
}

function formatDTMonthOfYear(node: DTMonthOfYear): string {
  const next = node.next ? "-" + formatDTNode(node.next) : "";
  let value = formatDTComponent(node.value, 2);

  return `${value}${next}`;
}

function formatDTGroupingOfYear(node: DTGroupingOfYear): string {
  let value = node.value.toString().padStart(2, "0");

  return value;
}

function formatDTDayOfMonth(node: DTDayOfMonth): string {
  const next = node.next ? formatDTNode(node.next) : "";
  let value = formatDTComponent(node.value, 2);

  return `${value}${next}`;
}

function formatDTComponent(component: DTComponent, minDigits: number): string {
  let value = String(Math.abs(component.value));
  value = value.padStart(minDigits, "0");
  if (component.significantDigits) {
    value = value + "S" + component.significantDigits;
  } else if (component.unspecifiedDigits) {
    value =
      value.slice(0, -component.unspecifiedDigits) +
      "".padEnd(component.unspecifiedDigits, "X");
  } else if (component.approximate && component.uncertain) {
    value = `%${value}`;
  } else {
    if (component.approximate) value = `~${value}`;
    if (component.uncertain) value = `?${value}`;
  }
  if (component.value < 0) value = "-" + value;

  return value;
}
