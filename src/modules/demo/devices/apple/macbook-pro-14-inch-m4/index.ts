import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const MACBOOK_PRO_14_INCH_M4: DemoDevice = {
  id: "apple_macbook_pro_14_inch_m4",
  name: "Macbook Pro 14-inch (M4)",
  type: "laptop",
  width: (3944 - 460 - 460) / 2,
  height: (2564 - 300 - 300) / 2,
  cornerRadius: 0,
  margin: {
    top: 300 / 2,
    left: 460 / 2,
    right: 460 / 2,
    bottom: 300 / 2,
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
