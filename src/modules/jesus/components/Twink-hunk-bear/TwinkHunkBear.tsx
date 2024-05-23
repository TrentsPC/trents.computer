import { JSX } from "solid-js";
import { colors } from "~/jesus.styles";

const SIDE_LENGTH = 50;
const HEIGHT = (Math.sqrt(3) * SIDE_LENGTH) / 2;
const GRIDLINES = 3;

const CENTER_X = SIDE_LENGTH / 2;
const CENTER_Y = (HEIGHT / 3) * 2;

function vector(size: number, degrees: number) {
  return {
    x: Math.sin((degrees / 180) * Math.PI) * size * CENTER_Y,
    y: -Math.cos((degrees / 180) * Math.PI) * size * CENTER_Y,
  };
}

export function TwinkHunkBear() {
  return (
    <div
      css={{ position: "relative", align: "center", mx: "auto" }}
      style={{
        width: SIDE_LENGTH + "vw",
        height: HEIGHT + "vw",
      }}
    >
      <Dots />
      <Images />
      <span
        css={{
          position: "absolute",
          top: "100%",
          right: "100%",
          pr: "2vw",
        }}
      >
        Twink
      </span>
      <span
        css={{
          position: "absolute",
          top: "100%",
          left: "100%",
          pl: "2vw",
        }}
      >
        Hunk
      </span>
      <span
        css={{
          position: "absolute",
          bottom: "100%",
          transform: "translateX(-50%)",
          pb: "1vw",
        }}
      >
        Bear
      </span>
    </div>
  );
}

function Images() {
  return (
    <>
      <Img twink={1} hunk={0} bear={0} />
      <Img twink={0} hunk={1} bear={0} />
    </>
  );
}

function Img(
  props: JSX.ImgHTMLAttributes<HTMLImageElement> & {
    twink: number;
    hunk: number;
    bear: number;
  }
) {
  const total = () => props.twink + props.hunk + props.bear;
  const twink = () => props.twink / total();
  const hunk = () => props.hunk / total();
  const bear = () => props.bear / total();

  const twinkVector = () => vector(twink(), 240);
  const hunkVector = () => vector(hunk(), 120);
  const bearVector = () => vector(bear(), 0);

  const x = () => twinkVector().x + hunkVector().x + bearVector().x + CENTER_X;
  const y = () => twinkVector().y + hunkVector().y + bearVector().y + CENTER_Y;

  return (
    <img
      {...props}
      css={{
        position: "absolute",
        w: 10,
        h: 10,
        bg: "red",
        transform: "translate(-50%, -50%)",
      }}
      style={{
        left: x() + "vw",
        top: y() + "vw",
      }}
    />
  );
}

function Dots() {
  return (
    <>
      <div
        css={{
          position: "absolute",
          w: "100%",
          h: "100%",
          bg: colors.slate6,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      />
      <div
        css={{
          position: "absolute",
          w: 8,
          h: 8,
          bg: colors.slate11,
          r: "100%",
          transform: "translate(-50%, -50%)",
        }}
        style={{
          left: CENTER_X + "vw",
          top: CENTER_Y + "vw",
        }}
      />
      <div
        css={{
          position: "absolute",
          w: 8,
          h: 8,
          bg: colors.slate11,
          r: "100%",
          transform: "translate(-50%, -50%)",
        }}
        style={{
          left: vector(1, 0).x + CENTER_X + "vw",
          top: vector(1, 0).y + CENTER_Y + "vw",
        }}
      />
      <div
        css={{
          position: "absolute",
          w: 8,
          h: 8,
          bg: colors.slate11,
          r: "100%",
          transform: "translate(-50%, -50%)",
        }}
        style={{
          left: vector(1, 120).x + CENTER_X + "vw",
          top: vector(1, 120).y + CENTER_Y + "vw",
        }}
      />
      <div
        css={{
          position: "absolute",
          w: 8,
          h: 8,
          bg: colors.slate11,
          r: "100%",
          transform: "translate(-50%, -50%)",
        }}
        style={{
          left: vector(1, 240).x + CENTER_X + "vw",
          top: vector(1, 240).y + CENTER_Y + "vw",
        }}
      />
    </>
  );
}
