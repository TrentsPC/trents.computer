import { IMAC_24 } from "./imac-24/imac-24";
import { IMAC_27 } from "./imac-27/imac-27";
import { IPAD_AIR_11_INCH_M2 } from "./ipad-air-11-inch-m2/ipad-air-11-inch-m2";
import { IPAD_AIR_13_INCH_M2 } from "./ipad-air-13-inch-m2/ipad-air-13-inch-m2";
import { IPAD_MINI } from "./ipad-mini/ipad-mini";
import { IPAD_PRO_11_INCH_M4 } from "./ipad-pro-11-inch-m4/ipad-pro-11-inch-m4";
import { IPAD_PRO_13_INCH_M4 } from "./ipad-pro-13-inch-m4/ipad-pro-13-inch-m4";
import { IPAD } from "./ipad/ipad";
import { IPHONE_16_PLUS } from "./iphone-16-plus/iphone-16-plus";
import { IPHONE16PROMAX } from "./iphone-16-pro-max/iphone16promax";
import { IPHONE16PRO } from "./iphone-16-pro/iphone16pro";
import { IPHONE_16 } from "./iphone-16/iphone-16";
import { MACBOOK_AIR_13_INCH_M2 } from "./macbook-air-13-inch-m2";
import { MACBOOK_PRO_14_INCH_M4 } from "./macbook-pro-14-inch-m4";
import { MACBOOK_PRO_16_INCH_M4 } from "./macbook-pro-16-inch-m4";
import { PRO_DISPLAY_XDR } from "./pro-display-xdr/pro-display-xdr";
import { APPLE_WATCH_SERIES_10 } from "./watch-series-10/watch-series-10";
import { APPLE_WATCH_SERIES_6 } from "./watch-series-6/watch-series-6";
import { APPLE_WATCH_SERIES_8 } from "./watch-series-8/watch-series-8";
import { APPLE_WATCH_ULTRA_2 } from "./watch-ultra-2/watch-ultra-2";

export const APPLE = [
  ...APPLE_WATCH_SERIES_6,
  ...APPLE_WATCH_SERIES_8,
  ...APPLE_WATCH_SERIES_10,
  APPLE_WATCH_ULTRA_2,

  ...IPHONE_16,
  ...IPHONE_16_PLUS,
  ...IPHONE16PRO,
  ...IPHONE16PROMAX,

  ...IPAD_MINI,
  ...IPAD,
  ...IPAD_AIR_11_INCH_M2,
  ...IPAD_AIR_13_INCH_M2,
  ...IPAD_PRO_11_INCH_M4,
  ...IPAD_PRO_13_INCH_M4,

  MACBOOK_AIR_13_INCH_M2,
  MACBOOK_PRO_14_INCH_M4,
  MACBOOK_PRO_16_INCH_M4,

  IMAC_24,
  IMAC_27,
  PRO_DISPLAY_XDR,
];
