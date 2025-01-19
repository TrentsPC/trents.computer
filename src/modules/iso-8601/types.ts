export type DTComponent = {
  value: number;
  significantDigits: number;
  unspecifiedDigits: number;
  approximate: boolean;
  uncertain: boolean;
};

export type DTRoot = {
  type: "root";
  value: DTYear | DTHour | undefined;
};

export type DTYear = {
  type: "year";
  value: DTComponent;
  next?: DTMonthOfYear | DTGroupingOfYear | DTDayOfYear;
};

export type DTMonthOfYear = {
  type: "monthOfYear";
  value: DTComponent;
  next?: DTDayOfMonth;
};

export type DTGroupingOfYear = {
  type: "groupingOfYear";
  value: number;
};

export type DTDayOfMonth = {
  type: "dayOfMonth";
  value: DTComponent;
  next?: undefined;
};

export type DTDayOfYear = {
  type: "dayOfYear";
  value: DTComponent;
  next?: undefined;
};

export type DTWeekOfYear = {
  type: "weekOfYear";
  value: DTComponent;
  next?: undefined;
};

export type DTHour = {
  type: "hour";
  value: DTComponent;
};

export type DTNode =
  | DTRoot
  | DTYear
  | DTMonthOfYear
  | DTGroupingOfYear
  | DTDayOfMonth
  | DTDayOfYear
  | DTWeekOfYear
  | DTHour;
