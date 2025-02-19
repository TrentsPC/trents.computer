import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const MACBOOK_PRO_16_INCH_M4: DemoDevice = {
  id: "apple_macbook_pro_16_inch_m4",
  name: "Macbook Pro 16-inch (M4)",
  type: "laptop",
  width: (4340 - 442 - 442) / 2,
  height: (2860 - 313 - 313) / 2,
  cornerRadius: 0,
  margin: {
    top: 313 / 2,
    left: 442 / 2,
    right: 442 / 2,
    bottom: 313 / 2,
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
