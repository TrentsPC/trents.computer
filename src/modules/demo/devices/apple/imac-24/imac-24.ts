import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const IMAC_24: DemoDevice = {
  id: "apple_imac_24",
  name: 'iMac 24"',
  type: "desktop",
  width: (4760 - 140 - 140) / 2,
  height: (4040 - 160 - 1360) / 2,
  cornerRadius: 0,
  margin: {
    top: 160 / 2,
    left: 140 / 2,
    right: 140 / 2,
    bottom: 1360 / 2,
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
