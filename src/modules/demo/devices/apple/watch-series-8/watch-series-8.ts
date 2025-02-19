import { DemoDevice } from "../../../types";
import iphone16proPortraitBlack from "./41mm-black.png";
import iphone16proPortraitWhite from "./41mm-white.png";
import iphone16proLandscapeBlack from "./45mm-black.png";
import iphone16proLandscapeWhite from "./45mm-white.png";

export const FORTY_ONE: DemoDevice = {
  id: "apple_watch_series_8_41mm",
  name: "Apple Watch Series 8 (41mm)",
  type: "watch",
  width: (480 - 64 - 64) / 2,
  height: (760 - 165 - 165) / 2,
  cornerRadius: 32,
  margin: {
    top: 165 / 2,
    left: 64 / 2,
    right: 64 / 2,
    bottom: 165 / 2,
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

export const FORTY_FIVE: DemoDevice = {
  id: "apple_watch_series_8_45mm",
  name: "Apple Watch Series 8 (45mm)",
  type: "watch",
  width: (540 - 72 - 72) / 2,
  height: (860 - 188 - 188) / 2,
  cornerRadius: 32,
  margin: {
    top: 188 / 2,
    left: 72 / 2,
    right: 72 / 2,
    bottom: 188 / 2,
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

export const APPLE_WATCH_SERIES_8 = [FORTY_ONE, FORTY_FIVE];
