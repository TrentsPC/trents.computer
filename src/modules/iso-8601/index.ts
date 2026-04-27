import { DTNode } from "./types";

type DTNodeType = DTNode["type"];

export function getPossibleNextSegments(segmentType: DTNodeType): DTNodeType[] {
  switch (segmentType) {
    case "root":
      return ["century", "decade", "year", "hour"];
    case "year":
      return ["monthOfYear", "groupingOfYear", "dayOfYear"];
    case "monthOfYear":
      return ["dayOfMonth"];
    case "century":
    case "decade":
    case "groupingOfYear":
    case "dayOfMonth":
    case "dayOfYear":
    case "weekOfYear":
    case "hour":
      return [];
  }
}

export function getDefaultSegment<NodeType extends DTNodeType>(segmentType: NodeType): DTNode {
  switch (segmentType) {
    case "root":
      return {
        type: "root",
        next: undefined,
      };
    case "century":
      return {
        type: "century",
        value: {
          value: Math.floor(new Date().getFullYear() / 100),
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "decade":
      return {
        type: "decade",
        value: {
          value: Math.floor(new Date().getFullYear() / 10),
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "year":
      return {
        type: "year",
        value: {
          value: new Date().getFullYear(),
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "monthOfYear":
      return {
        type: "monthOfYear",
        value: {
          value: new Date().getMonth() + 1,
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "groupingOfYear":
      return {
        type: "groupingOfYear",
        value: 21,
      };
    case "dayOfMonth":
      return {
        type: "dayOfMonth",
        value: {
          value: new Date().getDate(),
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "dayOfYear":
      return {
        type: "dayOfYear",
        value: {
          value: 1,
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "weekOfYear":
      return {
        type: "weekOfYear",
        value: {
          value: 0,
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
    case "hour":
      return {
        type: "hour",
        value: {
          value: 0,
          significantDigits: 0,
          unspecifiedDigits: 0,
          approximate: false,
          uncertain: false,
        },
      };
  }
}

const segmentNameMap: Record<DTNodeType, string> = {
  root: "Root",
  century: "Century",
  decade: "Decade",
  year: "Year",
  monthOfYear: "Month",
  groupingOfYear: "Grouping",
  dayOfMonth: "Day",
  dayOfYear: "Day",
  weekOfYear: "Week",
  hour: "Hour",
};

export function getSegmentName(segmentType: DTNodeType): string {
  return segmentNameMap[segmentType];
}
