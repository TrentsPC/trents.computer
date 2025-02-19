import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape-black.png";
import iphone16proLandscapeWhite from "./landscape-white.png";
import iphone16proPortraitBlack from "./portrait-black.png";
import iphone16proPortraitWhite from "./portrait-white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipad_pro_11_inch_m4_portrait",
  name: "iPad Pro 11-inch (M4) [Portrait]",
  type: "tablet",
  width: (1880 - 106 - 106) / 2,
  height: (2640 - 110 - 110) / 2,
  cornerRadius: 0,
  margin: {
    top: 110 / 2,
    left: 106 / 2,
    right: 106 / 2,
    bottom: 110 / 2,
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
  id: "apple_ipad_pro_11_inch_m4_landscape",
  name: "iPad Pro 11-inch (M4) [Landscape]",
  type: "tablet",
  height: (1880 - 106 - 106) / 2,
  width: (2640 - 110 - 110) / 2,
  cornerRadius: 0,
  margin: {
    left: 110 / 2,
    top: 106 / 2,
    bottom: 106 / 2,
    right: 110 / 2,
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

export const IPAD_PRO_11_INCH_M4 = [PORTRAIT, LANDSCAPE];
