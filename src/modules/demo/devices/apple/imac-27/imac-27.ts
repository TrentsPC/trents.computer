import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const IMAC_27: DemoDevice = {
  id: "apple_imac_27",
  name: 'iMac 27"',
  type: "desktop",
  width: 2560,
  height: 1440,
  cornerRadius: 0,
  margin: {
    top: 250 / 2,
    left: 260 / 2,
    right: 260 / 2,
    bottom: 1410 / 2,
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
