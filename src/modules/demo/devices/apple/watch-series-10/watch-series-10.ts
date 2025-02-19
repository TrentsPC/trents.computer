import { DemoDevice } from "../../../types";
import iphone16proPortraitBlack from "./42mm-black.png";
import iphone16proPortraitWhite from "./42mm-white.png";
import iphone16proLandscapeBlack from "./46mm-black.png";
import iphone16proLandscapeWhite from "./46mm-white.png";

export const FORTY_TWO: DemoDevice = {
  id: "apple_watch_series_10_42mm",
  name: "Apple Watch Series 10 (42mm)",
  type: "watch",
  width: 187,
  height: 223,
  cornerRadius: 32,
  margin: {
    top: 167 / 2,
    left: 63 / 2,
    right: 63 / 2,
    bottom: 167 / 2,
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

export const FORTY_SIX: DemoDevice = {
  id: "apple_watch_series_10_46mm",
  name: "Apple Watch Series 10 (46mm)",
  type: "watch",
  width: 208,
  height: 248,
  cornerRadius: 32,
  margin: {
    top: 192 / 2,
    left: 72 / 2,
    right: 72 / 2,
    bottom: 192 / 2,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: iphone16proLandscapeBlack,
    white: iphone16proLandscapeWhite,
    signature: iphone16proLandscapeBlack,
  },
};

export const APPLE_WATCH_SERIES_10 = [FORTY_TWO, FORTY_SIX];
