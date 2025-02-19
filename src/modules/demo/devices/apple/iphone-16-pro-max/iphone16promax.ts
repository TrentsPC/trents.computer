import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape_black.png";
import iphone16proLandscapeDesertTitanium from "./landscape_desert.png";
import iphone16proLandscapeWhite from "./landscape_white.png";
import iphone16proPortraitBlack from "./portrait_black.png";
import iphone16proPortraitDesertTitanium from "./portrait_desert.png";
import iphone16proPortraitWhite from "./portrait_white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_iphone16promax_portrait",
  name: "iPhone 16 Pro Max",
  type: "phone",
  width: 440,
  height: 956,
  cornerRadius: 32,
  margin: {
    top: 66 / 3,
    left: 75 / 3,
    right: 75 / 3,
    bottom: 66 / 3,
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
  id: "apple_iphone16promax_landscape",
  name: "iPhone 16 Pro Max (Landscape)",
  type: "phone",
  height: 440,
  width: 956,
  cornerRadius: 32,
  margin: {
    left: 66 / 3,
    top: 75 / 3,
    bottom: 75 / 3,
    right: 66 / 3,
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

export const IPHONE16PROMAX = [PORTRAIT, LANDSCAPE];
