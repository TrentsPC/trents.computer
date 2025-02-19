import { DemoDevice } from "../../../types";
import iphone16proLandscapeBlack from "./landscape-black.png";
import iphone16proLandscapeDesertTitanium from "./landscape-ultramarine.png";
import iphone16proLandscapeWhite from "./landscape-white.png";
import iphone16proPortraitBlack from "./portrait-black.png";
import iphone16proPortraitDesertTitanium from "./portrait-ultramarine.png";
import iphone16proPortraitWhite from "./portrait-white.png";

export const PORTRAIT: DemoDevice = {
  id: "apple_iphone16plus_portrait",
  name: "iPhone 16 Plus",
  type: "phone",
  width: 430,
  height: 932,
  cornerRadius: 32,
  margin: {
    top: 90 / 3,
    left: 90 / 3,
    right: 90 / 3,
    bottom: 90 / 3,
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
  id: "apple_iphone16plus_landscape",
  name: "iPhone 16 Plus (Landscape)",
  type: "phone",
  width: 932,
  height: 430,
  cornerRadius: 32,
  margin: {
    left: 90 / 3,
    top: 90 / 3,
    bottom: 90 / 3,
    right: 90 / 3,
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

export const IPHONE_16_PLUS = [PORTRAIT, LANDSCAPE];
