import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape-black.png";
import iphone16proLandscapeWhite from "./landscape-white.png";
import iphone16proPortraitBlack from "./portrait-black.png";
import iphone16proPortraitWhite from "./portrait-white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipad_pro_13_inch_m4_portrait",
  name: "iPad Pro 13-inch (M4) [Portrait]",
  type: "tablet",
  width: (2300 - 118 - 118) / 2,
  height: (3000 - 124 - 124) / 2,
  cornerRadius: 0,
  margin: {
    top: 124 / 2,
    left: 118 / 2,
    right: 118 / 2,
    bottom: 124 / 2,
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

export const LANDSCAPE: DemoDevice = {
  id: "apple_ipad_pro_13_inch_m4_landscape",
  name: "iPad Pro 13-inch (M4) [Landscape]",
  type: "tablet",
  height: (2300 - 118 - 118) / 2,
  width: (3000 - 124 - 124) / 2,
  cornerRadius: 0,
  margin: {
    left: 124 / 2,
    top: 118 / 2,
    bottom: 118 / 2,
    right: 124 / 2,
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

export const IPAD_PRO_13_INCH_M4 = [PORTRAIT, LANDSCAPE];
