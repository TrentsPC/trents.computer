import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const PRO_DISPLAY_XDR: DemoDevice = {
  id: "apple_pro_display_xdr",
  name: "Pro Display XDR",
  type: "desktop",
  width: 6016 / 2,
  height: 3384 / 2,
  cornerRadius: 0,
  margin: {
    top: 150 / 2,
    left: 150 / 2,
    right: 150 / 2,
    bottom: 1231 / 2,
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
