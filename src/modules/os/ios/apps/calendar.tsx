import { lazy } from "solid-js";
import safari from "../icons/calendar.webp";
import { FakeIOSApplication } from "../types";

export const CALENDAR: FakeIOSApplication = {
  id: "calendar",
  name: "Calendar",
  iconSrc: safari,
  component: lazy(() => import("./calendar.lazy")),
};
