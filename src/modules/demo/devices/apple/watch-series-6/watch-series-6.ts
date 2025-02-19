import { DemoDevice } from "../../../types";
import iphone16proPortraitBlack from "./44mm-black.png";
import iphone16proPortraitWhite from "./44mm-white.png";

export const FORTY_TWO: DemoDevice = {
  id: "apple_watch_series_6_44mm",
  name: "Apple Watch Series 6 (44mm)",
  type: "watch",
  width: (1100 - 182 - 182) / 4,
  height: (1800 - 452 - 452) / 4,
  cornerRadius: 32,
  margin: {
    top: 452 / 4,
    left: 182 / 4,
    right: 182 / 4,
    bottom: 452 / 4,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: iphone16proPortraitBlack,
    white: iphone16proPortraitWhite,
    signature: iphone16proPortraitBlack,
  },
};

export const APPLE_WATCH_SERIES_6 = [FORTY_TWO];
