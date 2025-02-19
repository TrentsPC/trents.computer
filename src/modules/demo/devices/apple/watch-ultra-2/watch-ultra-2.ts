import { DemoDevice } from "../../../types";
import iphone16proPortraitBlack from "./black.png";
import iphone16proPortraitDesertTitanium from "./signature.png";
import iphone16proPortraitWhite from "./white.png";

export const APPLE_WATCH_ULTRA_2: DemoDevice = {
  id: "apple_watch_ultra_2",
  name: "Apple Watch Ultra 2",
  type: "watch",
  width: 205,
  height: 251,
  cornerRadius: 32,
  margin: {
    top: 219 / 2,
    left: 95 / 2,
    right: 95 / 2,
    bottom: 219 / 2,
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
    signature: iphone16proPortraitDesertTitanium,
  },
};
