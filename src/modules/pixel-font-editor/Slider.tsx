import { styled } from "@hypergood/css";

const GAMEBOY = ["#a3b334", "#6B882E", "#3A6122", "#0F3810"];

export type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
};

export function Slider(props: SliderProps) {
  const percentage = () => {
    return (props.value - props.min) / (props.max - props.min);
  };
  let ref: HTMLDivElement = null!;

  function handleSliderMove(e: MouseEvent) {
    const rect = ref.getBoundingClientRect();
    const down = e.buttons === 1;
    if (!down) return;
    const total = rect.width;
    const percentage = (e.clientX - rect.left) / total;

    const fractionalValue = (props.max - props.min) * percentage + props.min;
    const roundedValue = Math.round(fractionalValue / props.step) * props.step;
    const clampedValue = Math.max(props.min, Math.min(roundedValue, props.max));
    props.onValueChange(clampedValue);
  }

  return (
    <Root
      ref={ref}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        target.setPointerCapture(event.pointerId);
        handleSliderMove(event);
      }}
      onPointerMove={(event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) handleSliderMove(event);
      }}
      onPointerUp={(event) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
        }
      }}
    >
      <Track
        style={{
          background: GAMEBOY[1],
        }}
      >
        <Indicator
          style={{
            width: percentage() * 100 + "%",
            height: "100%",
            background: GAMEBOY[3],
          }}
        />
      </Track>
      <Thumb
        style={{
          position: "absolute",
          top: "-4px",
          left: `calc(${percentage() * 100}% - ${2 * percentage()}px)`,
          height: "16px",
          width: "2px",
          background: GAMEBOY[3],
        }}
      />
    </Root>
  );
}

const Root = styled("div", {
  height: "8px",
  width: "100px",
  position: "relative",
});

const Track = styled("div", {
  height: "100%",
  width: "100%",
  "clip-path": `polygon(
        0px calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0px,
        2px 0px,
        2px 2px,
        0px 2px
        )`,
});

const Indicator = styled("div", {});
const Thumb = styled("div", {});
