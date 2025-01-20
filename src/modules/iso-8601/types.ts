export type DTComponent = {
  value: number;
  significantDigits: number;
  unspecifiedDigits: number;
  approximate: boolean;
  uncertain: boolean;
};

export type DTRoot = {
  type: "root";
  next?: DTCentury | DTDecade | DTYear | DTHour | undefined;
};

export type DTCentury = {
  type: "century";
  value: DTComponent;
  next?: undefined;
};

export type DTDecade = {
  type: "decade";
  value: DTComponent;
  next?: undefined;
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
  next?: undefined;
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
  next?: undefined;
};

export type DTNode =
  | DTRoot
  | DTCentury
  | DTDecade
  | DTYear
  | DTMonthOfYear
  | DTGroupingOfYear
  | DTDayOfMonth
  | DTDayOfYear
  | DTWeekOfYear
  | DTHour;
