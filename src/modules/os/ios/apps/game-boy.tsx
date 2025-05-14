import { lazy } from "solid-js";
import safari from "../icons/itunes-store.png";
import { FakeIOSApplication } from "../types";

export const GAME_BOY: FakeIOSApplication = {
  id: "game-boy",
  name: "Game Boy",
  iconSrc: safari,
  component: lazy(() => import("./game-boy.lazy")),
};
