import {
  JSX,
  ValidComponent,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { colors } from "~/jesus.styles";

function parseHashData(hash: string) {
  let hashData = hash.slice(1).split("/").map(Number);
  if (hashData.length === 0) {
    hashData = [0];
  }
  return hashData;
}

export function createHashData() {
  const [hashData, _setHashData] = createSignal<number[]>(
    parseHashData(window.location.hash)
  );

  function onHashChange() {
    _setHashData(parseHashData(window.location.hash));
  }

  window.addEventListener("hashchange", onHashChange);
  onCleanup(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  function setHashData(newHashData: number[]) {
    window.location.hash = newHashData.join("/");
  }

  return [hashData, setHashData] as const;
}

export function Slideshow(props: {
  children?: JSX.Element;
  slides: ValidComponent[];
}) {
  const [hashData] = createHashData();
  const slideIdx = () => hashData()[0] ?? 0;
  return <Dynamic component={props.slides[slideIdx()] || props.slides[0]} />;
}

export function Slide<T>(props: { children?: JSX.Element; animations?: T[] }) {
  const [hashData, setHashData] = createHashData();
  const slideIdx = () => hashData()[0] || 0;
  const animationIdx = () => hashData()[1] || 0;

  function handleForwards() {
    if (!props.animations?.length) {
      setHashData([slideIdx() + 1, 0]);
    }
    if (animationIdx() < (props.animations?.length ?? 0) - 1) {
      setHashData([slideIdx(), animationIdx() + 1]);
    } else {
      setHashData([slideIdx() + 1, 0]);
    }
  }
  function handleBackwards() {
    if (animationIdx() > 0) {
      setHashData([slideIdx(), animationIdx() - 1]);
    } else if (slideIdx() > 0) {
      setHashData([slideIdx() - 1, 0]);
    }
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
      handleForwards();
    } else if (e.key === "Space") {
      handleForwards();
    } else if (e.key === "ArrowLeft") {
      handleBackwards();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", onKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });
  return (
    <div
      css={{
        position: "relative",
        d: "flex",
        flexDir: "column",
        h: "100vh",
        justify: "center",
        items: "center",
        align: "center",
      }}
      style={{
        background: colors.slate3,
        color: colors.slateA12,
      }}
    >
      {props.children}
    </div>
  );
}

export function createSlideData<T>(data: T[]) {
  function useSlideData() {
    const [hashData] = createHashData();
    const slideIdx = () => hashData()[1] || 0;
    return () => data[slideIdx()];
  }
  return { slideData: data, useSlideData };
}
