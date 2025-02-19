import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape.png";
import iphone16proPortraitWhite from "./portrait.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipadmini_portrait",
  name: "iPad mini (Portrait)",
  type: "tablet",
  width: (1780 - 146 - 146) / 2,
  height: (2550 - 142 - 142) / 2,
  cornerRadius: 0,
  margin: {
    top: 142 / 2,
    left: 146 / 2,
    right: 146 / 2,
    bottom: 142 / 2,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: iphone16proPortraitWhite,
    white: iphone16proPortraitWhite,
    signature: iphone16proPortraitWhite,
  },
};

export const LANDSCAPE: DemoDevice = {
  id: "apple_ipadmini_landscape",
  name: "iPad mini (Landscape)",
  type: "tablet",
  height: (1780 - 146 - 146) / 2,
  width: (2550 - 142 - 142) / 2,
  cornerRadius: 0,
  margin: {
    left: 142 / 2,
    top: 146 / 2,
    bottom: 146 / 2,
    right: 142 / 2,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: iphone16proLandscapeBlack,
    white: iphone16proLandscapeBlack,
    signature: iphone16proLandscapeBlack,
  },
};

export const IPAD_MINI = [PORTRAIT, LANDSCAPE];
