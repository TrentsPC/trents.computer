import { lazy } from "solid-js";
import safari from "../icons/Messages.png";
import { FakeIOSApplication } from "../types";

export const MESSAGES: FakeIOSApplication = {
  id: "com.apple.Messages",
  name: "Messages",
  iconSrc: safari,
  component: lazy(() => import("./messages.lazy")),
};
