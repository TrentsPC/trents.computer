import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape.png";
import iphone16proPortraitWhite from "./portrait.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_ipad_portrait",
  name: "iPad (Portrait)",
  type: "tablet",
  width: (1840 - 110 - 110) / 2,
  height: (2660 - 250 - 250) / 2,
  cornerRadius: 0,
  margin: {
    top: 250 / 2,
    left: 110 / 2,
    right: 110 / 2,
    bottom: 250 / 2,
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
  id: "apple_ipad_landscape",
  name: "iPad (Landscape)",
  type: "tablet",
  height: (1840 - 110 - 110) / 2,
  width: (2660 - 250 - 250) / 2,
  cornerRadius: 0,
  margin: {
    left: 250 / 2,
    top: 110 / 2,
    bottom: 110 / 2,
    right: 250 / 2,
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

export const IPAD = [PORTRAIT, LANDSCAPE];
