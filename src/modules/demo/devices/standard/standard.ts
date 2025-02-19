import { DemoDevice } from "../../types";

const SHITTY_WINDOWS_LAPTOP: DemoDevice = {
  id: "SHITTY_WINDOWS_LAPTOP",
  name: "Shitty Windows Laptop",
  type: "laptop",
  width: 1366,
  height: 768,
  cornerRadius: 0,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: "",
    white: "",
    signature: "",
  },
};

const TEN_EIGHTY: DemoDevice = {
  id: "standard_1080",
  name: "1080p",
  type: "desktop",
  width: 1920,
  height: 1080,
  cornerRadius: 0,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: "",
    white: "",
    signature: "",
  },
};

const TEN_EIGHTY_PORTRAIT: DemoDevice = {
  id: "standard_1080_portrait",
  name: "1080p (Portrait)",
  type: "desktop",
  width: 1080,
  height: 1920,
  cornerRadius: 0,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: "",
    white: "",
    signature: "",
  },
};

const FOURTEEN_FORTY_PORTRAIT: DemoDevice = {
  id: "standard_1440_portrait",
  name: "1440p (Portrait)",
  type: "desktop",
  width: 1440,
  height: 2560,
  cornerRadius: 0,
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // safeArea: {
  //   top: 59,
  //   left: 0,
  //   right: 0,
  //   bottom: 34,
  // },
  bezels: {
    black: "",
    white: "",
    signature: "",
  },
};

export const STANDARD = [
  SHITTY_WINDOWS_LAPTOP,
  TEN_EIGHTY,
  TEN_EIGHTY_PORTRAIT,
  FOURTEEN_FORTY_PORTRAIT,
];
