import { createMemo, createSignal, For } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "~/components/macos-ui/DropdownMenu";
import { APPLE } from "./devices/apple/apple";
import { PORTRAIT } from "./devices/apple/iphone-16-pro/iphone16pro";
import { SAMSUNG } from "./devices/samsung/samsung";
import { STANDARD } from "./devices/standard/standard";
import { DeviceType, Material } from "./types";

const DEVICES = [...APPLE, ...SAMSUNG, ...STANDARD];
DEVICES.sort((a, b) => a.width - b.width);

const TYPES: Array<{ id: DeviceType; name: string }> = [
  { id: "watch", name: "Watches" },
  { id: "phone", name: "Phones" },
  { id: "tablet", name: "Tablets" },
  { id: "laptop", name: "Laptops" },
  { id: "desktop", name: "Desktops" },
];

export function ResponsiveDesignDemo(props: { initialPath: string }) {
  const [selectedDeviceId, setSelectedDeviceId] = createSignal("");
  const [selectedMaterial, setSelectedMaterial] =
    createSignal<Material>("signature");
  const [background, setBackground] = createSignal("#fffbe6");
  const device = createMemo(
    () => DEVICES.find((d) => d.id === selectedDeviceId()) || PORTRAIT
  );
  const xxs = createMemo(() => DEVICES.findLast((d) => d.width < 320)!);
  const xs = createMemo(() => DEVICES.find((d) => d.width >= 320)!);
  const sm = createMemo(() => DEVICES.find((d) => d.width >= 600)!);
  const md = createMemo(() => DEVICES.find((d) => d.width >= 840)!);
  const lg = createMemo(() => DEVICES.find((d) => d.width >= 1200)!);
  const xl = createMemo(() => DEVICES.find((d) => d.width >= 1600)!);

  const scaleFactor = createMemo(() => {
    const d = device();
    if (typeof window === "undefined") return 1;
    const containerWidth = window.innerWidth - 40;
    const containerHeight = window.innerHeight - 40;
    const deviceWidth = d.width + Math.max(d.margin.left, d.margin.right) * 2;
    const deviceHeight = d.height + Math.max(d.margin.top, d.margin.bottom) * 2;
    const scaleWidth = containerWidth / deviceWidth;
    const scaleHeight = containerHeight / deviceHeight;
    const scale = Math.min(scaleWidth, scaleHeight);

    const clampedScale = Math.min(2, scale);

    return clampedScale;
  });

  return (
    <div
      css={{
        size: "100%",
        display: "flex",
        items: "center",
        justify: "center",
      }}
      style={{
        background: background(),
      }}
    >
      <div css={{ display: "flex", position: "absolute", top: 0, left: 0 }}>
        <DropdownMenu
          content={
            <>
              <For each={TYPES}>
                {(type) => (
                  <DropdownMenuSub
                    content={
                      <>
                        <For
                          each={DEVICES.filter((d) => d.type === type.id).sort(
                            (a, b) => a.width - b.width
                          )}
                        >
                          {(device) => (
                            <DropdownMenuItem
                              onSelect={() => {
                                setSelectedDeviceId(device.id);
                              }}
                            >
                              {device.name}
                            </DropdownMenuItem>
                          )}
                        </For>
                      </>
                    }
                  >
                    {type.name}
                  </DropdownMenuSub>
                )}
              </For>
              <DropdownMenuSub
                content={
                  <>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(xxs().id);
                      }}
                    >
                      {xxs().width}px - {xxs().name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(xs().id);
                      }}
                    >
                      {xs().width}px - {xs().name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(sm().id);
                      }}
                    >
                      {sm().width}px - {sm().name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(md().id);
                      }}
                    >
                      {md().width}px - {md().name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(lg().id);
                      }}
                    >
                      {lg().width}px - {lg().name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => {
                        setSelectedDeviceId(xl().id);
                      }}
                    >
                      {xl().width}px - {xl().name}
                    </DropdownMenuItem>
                  </>
                }
              >
                Breakpoints
              </DropdownMenuSub>
            </>
          }
        >
          <DropdownMenuTrigger>Device</DropdownMenuTrigger>
        </DropdownMenu>
        <DropdownMenu
          content={
            <>
              <DropdownMenuItem onSelect={() => setSelectedMaterial("black")}>
                Black
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSelectedMaterial("white")}>
                White
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setSelectedMaterial("signature")}
              >
                Signature
              </DropdownMenuItem>
            </>
          }
        >
          <DropdownMenuTrigger>Material</DropdownMenuTrigger>
        </DropdownMenu>
      </div>
      <div
        css={{
          position: "relative",
          filter:
            "drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.25)) drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.33))",
        }}
      >
        <div
          css={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
          style={{
            transform: `translate(-50%, -50%) scale(${scaleFactor()})`,
            width: device().width + "px",
            height: device().height + "px",
          }}
        >
          <div
            css={{
              backgroundColor: "#fff",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            style={{ "border-radius": device().cornerRadius + "px" }}
          >
            <iframe src="/pantry/books/2" css={{ size: "100%", border: 0 }} />
          </div>
          <img
            css={{
              position: "absolute",
              pointerEvents: "none",
            }}
            style={{
              top: -device().margin.top + "px",
              left: -device().margin.left + "px",
              "min-width":
                device().width +
                device().margin.left +
                device().margin.right +
                "px",
              "min-height":
                device().height +
                device().margin.top +
                device().margin.bottom +
                "px",
            }}
            src={device().bezels[selectedMaterial()]}
          />
        </div>
      </div>
    </div>
  );
}
