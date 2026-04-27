import { JSX } from "solid-js";
import { DTCentury, DTNode, DTRoot, DTYear } from "./types";

export function describeDTRoot(node: DTRoot): JSX.Element {
  const segments = flattenDTLinkedList(node.next);

  function matches(pattern: Array<DTNode["type"]>) {
    if (segments.length !== pattern.length) return false;
    for (let i = 0; i < segments.length; i++) {
      if (segments[i].type !== pattern[i]) return false;
    }
    return true;
  }
  switch (true) {
    case matches(["century"]):
      return <span>{ordinal((node.next as DTCentury).value.value + 1)} century</span>;
    case matches(["decade"]):
      return <span>the {(node.next as DTCentury).value.value}0s</span>;
    case matches(["year"]):
      return describeOnlyYear(node.next as DTYear);
  }
  return "";
}

function describeOnlyYear(year: DTYear) {
  let value = year.value.value;
  if (value < 1) return <span>the year {Math.abs(value - 1)} BC</span>;
  return <span>the year {year.value.value}</span>;
}

function flattenDTLinkedList(node: DTNode | undefined): DTNode[] {
  let result: DTNode[] = [];
  let current: DTNode | undefined = node;
  while (current) {
    result.push(current);
    current = current.next;
  }
  return result;
}

function getSuffix(n: number) {
  if (n === 11) return "th";
  if (n === 12) return "th";
  if (n === 13) return "th";
  const lastDigit = n % 10;
  if (lastDigit === 1) return "st";
  if (lastDigit === 2) return "nd";
  if (lastDigit === 3) return "rd";
  return "th";
}

function ordinal(n: number) {
  return n + getSuffix(n);
}
