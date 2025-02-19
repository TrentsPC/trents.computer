import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape-black.png";
import iphone16proLandscapeDesertTitanium from "./landscape-signature.png";
import iphone16proLandscapeWhite from "./landscape-white.png";
import iphone16proPortraitBlack from "./portrait-black.png";
import iphone16proPortraitDesertTitanium from "./portrait-signature.png";
import iphone16proPortraitWhite from "./portrait-white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipad_air_11_inch_m2_portrait",
  name: "iPad Air 11-inch (M2) [Portrait]",
  type: "tablet",
  width: (1900 - 130 - 130) / 2,
  height: (2620 - 130 - 130) / 2,
  cornerRadius: 0,
  margin: {
    top: 130 / 2,
    left: 130 / 2,
    right: 130 / 2,
    bottom: 130 / 2,
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
  id: "apple_ipad_air_11_inch_m2_landscape",
  name: "iPad Air 11-inch (M2) [Landscape]",
  type: "tablet",
  height: (1900 - 130 - 130) / 2,
  width: (2620 - 130 - 130) / 2,
  cornerRadius: 0,
  margin: {
    left: 130 / 2,
    top: 130 / 2,
    bottom: 130 / 2,
    right: 130 / 2,
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

export const IPAD_AIR_11_INCH_M2 = [PORTRAIT, LANDSCAPE];
