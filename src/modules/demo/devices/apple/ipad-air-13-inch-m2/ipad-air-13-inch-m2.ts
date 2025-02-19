import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape-black.png";
import iphone16proLandscapeDesertTitanium from "./landscape-signature.png";
import iphone16proLandscapeWhite from "./landscape-white.png";
import iphone16proPortraitBlack from "./portrait-black.png";
import iphone16proPortraitDesertTitanium from "./portrait-signature.png";
import iphone16proPortraitWhite from "./portrait-white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipad_air_13_inch_m2_portrait",
  name: "iPad Air 13-inch (M2) [Portrait]",
  type: "tablet",
  width: (2300 - 126 - 126) / 2,
  height: (2980 - 124 - 124) / 2,
  cornerRadius: 0,
  margin: {
    top: 124 / 2,
    left: 126 / 2,
    right: 126 / 2,
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
    signature: iphone16proPortraitDesertTitanium,
  },
};

export const LANDSCAPE: DemoDevice = {
  id: "apple_ipad_air_13_inch_m2_landscape",
  name: "iPad Air 13-inch (M2) [Landscape]",
  type: "tablet",
  height: (2300 - 126 - 126) / 2,
  width: (2980 - 124 - 124) / 2,
  cornerRadius: 0,
  margin: {
    left: 124 / 2,
    top: 126 / 2,
    bottom: 126 / 2,
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
    signature: iphone16proLandscapeDesertTitanium,
  },
};

export const IPAD_AIR_13_INCH_M2 = [PORTRAIT, LANDSCAPE];
