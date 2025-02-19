import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape_black.png";
import iphone16proLandscapeDesertTitanium from "./landscape_deserttitanium.png";
import iphone16proLandscapeWhite from "./landscape_white.png";
import iphone16proPortraitBlack from "./portrait_black.png";
import iphone16proPortraitDesertTitanium from "./portrait_deserttitanium.png";
import iphone16proPortraitWhite from "./portrait_white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_iphone16pro_portrait",
  name: "iPhone 16 Pro",
  type: "phone",
  width: (1350 - 72 - 72) / 3,
  height: (2760 - 69 - 69) / 3,
  cornerRadius: 32,
  margin: {
    top: 69 / 3,
    left: 72 / 3,
    right: 72 / 3,
    bottom: 69 / 3,
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

export const LANDSCAPE: DemoDevice = {
  id: "apple_iphone16pro_landscape",
  name: "iPhone 16 Pro (Landscape)",
  type: "phone",
  height: (1350 - 72 - 72) / 3,
  width: (2760 - 69 - 69) / 3,
  cornerRadius: 32,
  margin: {
    left: 69 / 3,
    top: 72 / 3,
    bottom: 72 / 3,
    right: 69 / 3,
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
    signature: iphone16proLandscapeDesertTitanium,
  },
};

export const IPHONE16PRO = [PORTRAIT, LANDSCAPE];
