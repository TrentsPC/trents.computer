import { DemoDevice } from "../../../types";
import iphone16proPortraitWhite from "./white.png";

export const MACBOOK_AIR_13_INCH_M2: DemoDevice = {
  id: "apple_macbook_air_13_inch_m2",
  name: "Macbook Air 13-inch (M2)",
  type: "laptop",
  width: (3220 - 330 - 330) / 2,
  height: (2100 - 218 - 218) / 2,
  cornerRadius: 0,
  margin: {
    top: 218 / 2,
    left: 330 / 2,
    right: 330 / 2,
    bottom: 218 / 2,
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
