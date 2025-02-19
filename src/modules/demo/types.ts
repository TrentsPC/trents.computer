export type DemoDevice = {
  /**
   * make_model
   */
  id: string;
  /**
   * The name of the device.
   */
  name: string;
  type: DeviceType;
  /**
   * The width of the screen in points.
   */
  width: number;
  /**
   * The height of the screen in points.
   */
  height: number;
  margin: Inset;
  cornerRadius: number;
  bezels: Record<Material, string>;
};

export type Inset = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type DeviceType = "watch" | "phone" | "tablet" | "laptop" | "desktop";

export type Material = "black" | "white" | "signature";
