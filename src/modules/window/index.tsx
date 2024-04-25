import { useDrag } from "solid-gesture";
import { JSX, createContext, createSignal, useContext } from "solid-js";
import { Portal, isServer } from "solid-js/web";

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowOptions = {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  collisionPaddingTop?: number;
  collisionPaddingBottom?: number;
  collisionPaddingLeft?: number;
  collisionPaddingRight?: number;
};

function isInBounds(
  { x, y, width, height }: Rect,
  options: WindowOptions
): boolean {
  const {
    minWidth = 0,
    minHeight = 0,
    maxWidth = Infinity,
    maxHeight = Infinity,
    collisionPaddingTop = 0,
    collisionPaddingBottom = 0,
    collisionPaddingLeft = 0,
    collisionPaddingRight = 0,
  } = options;

  if (x < collisionPaddingLeft) return false;
  if (y < collisionPaddingTop) return false;
  if (x + width > window.innerWidth - collisionPaddingRight) return false;
  if (y + height > window.innerHeight - collisionPaddingBottom) return false;
  if (width < minWidth) return false;
  if (height < minHeight) return false;
  if (width > maxWidth) return false;
  if (height > maxHeight) return false;
  return true;
}

function shiftInBounds({ x, y, width, height }: Rect, options: WindowOptions) {
  const {
    minWidth = 0,
    minHeight = 0,
    maxWidth = Infinity,
    maxHeight = Infinity,
    collisionPaddingTop = 0,
    collisionPaddingRight = 0,
    collisionPaddingBottom = 0,
    collisionPaddingLeft = 0,
  } = options;

  if (x < collisionPaddingLeft) x = collisionPaddingLeft;
  if (y < collisionPaddingTop) y = collisionPaddingTop;
  if (width < minWidth) width = minWidth;
  if (height < minHeight) height = minHeight;
  if (width > maxWidth) width = maxWidth;
  if (height > maxHeight) height = maxHeight;
  if (x + width > window.innerWidth - collisionPaddingRight)
    x = window.innerWidth - width - collisionPaddingRight;
  if (y + height > window.innerHeight - collisionPaddingBottom)
    y = window.innerHeight - height - collisionPaddingBottom;

  return {
    x,
    y,
    width,
    height,
  } as Rect;
}

const TARGET_SIZE = "8px";
const TARGET_INSET = "-4px";

const WindowContext = createContext<{
  setDelta: (delta: Rect) => void;
  commitDelta: (delta: Rect) => void;
}>({
  setDelta: () => {},
  commitDelta: () => {},
});

function findCurrentRect(rect: Rect, delta: Rect, options: WindowOptions) {
  let { x, y, width, height } = rect;

  let xDir = delta.x > 0 ? 1 : delta.x < 0 ? -1 : 0;
  let yDir = delta.y > 0 ? 1 : delta.y < 0 ? -1 : 0;
  let widthDir = delta.width > 0 ? 1 : delta.width < 0 ? -1 : 0;
  let heightDir = delta.height > 0 ? 1 : delta.height < 0 ? -1 : 0;
  let xMag = Math.abs(delta.x);
  let yMag = Math.abs(delta.y);
  let widthMag = Math.abs(delta.width);
  let heightMag = Math.abs(delta.height);
  let max = Math.max(xMag, yMag, widthMag, heightMag);

  for (let i = 0; i <= max; i++) {
    let dx = i <= xMag ? xDir : 0;
    let dwidth = i <= widthMag ? widthDir : 0;

    if (isInBounds({ x: x + dx, y, width: width + dwidth, height }, options)) {
      x += dx;
      width += dwidth;
    } else {
      break;
    }
  }

  for (let i = 0; i <= max; i++) {
    let dy = i <= yMag ? yDir : 0;
    let dheight = i <= heightMag ? heightDir : 0;

    if (
      isInBounds({ y: y + dy, x, height: height + dheight, width }, options)
    ) {
      y += dy;
      height += dheight;
    } else {
      break;
    }
  }

  return {
    x,
    y,
    width,
    height,
  };
}

export function Window(props: {
  children?: JSX.Element;
  initialRect?: Rect;
  options?: WindowOptions;
}) {
  const [frame, setFrame] = createSignal<Rect>(
    props.initialRect ?? {
      x: 200,
      y: 200,
      width: 200,
      height: 200,
    }
  );
  const [delta, setDelta] = createSignal<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  if (!isServer) {
    const initiallyInBounds = isInBounds(frame(), props.options ?? {});
    if (!initiallyInBounds) {
      setFrame(shiftInBounds(frame(), props.options ?? {}));
    }
  }

  const currentRect = () =>
    findCurrentRect(frame(), delta(), props.options ?? {});

  const createHandler = (getDelta: ([mx, my]: [number, number]) => Rect) => {
    return useDrag(({ down, movement: [mx, my] }) => {
      if (down) {
        setDelta(getDelta([mx, my]));
      } else {
        let c = frame();
        let d = getDelta([mx, my]);
        setFrame(findCurrentRect(c, d, props.options ?? {}));
        setDelta({ x: 0, y: 0, width: 0, height: 0 });
      }
    });
  };

  const top = createHandler(([mx, my]) => ({
    x: 0,
    y: my,
    width: 0,
    height: -my,
  }));

  const bottom = createHandler(([mx, my]) => ({
    x: 0,
    y: 0,
    width: 0,
    height: my,
  }));

  const left = createHandler(([mx, my]) => ({
    x: mx,
    y: 0,
    width: -mx,
    height: 0,
  }));

  const right = createHandler(([mx, my]) => ({
    x: 0,
    y: 0,
    width: mx,
    height: 0,
  }));

  const topLeft = createHandler(([mx, my]) => ({
    x: mx,
    y: my,
    width: -mx,
    height: -my,
  }));

  const topRight = createHandler(([mx, my]) => ({
    x: 0,
    y: my,
    width: mx,
    height: -my,
  }));

  const bottomLeft = createHandler(([mx, my]) => ({
    x: mx,
    y: 0,
    width: -mx,
    height: my,
  }));

  const bottomRight = createHandler(([mx, my]) => ({
    x: 0,
    y: 0,
    width: mx,
    height: my,
  }));

  const commitDelta = (delta: Rect) => {
    let c = frame();
    setFrame(findCurrentRect(c, delta, props.options ?? {}));
    setDelta({ x: 0, y: 0, width: 0, height: 0 });
  };

  return (
    <Portal>
      <div
        style={{
          ...props.style,
          position: "absolute",
          left: currentRect().x + "px",
          top: currentRect().y + "px",
          width: currentRect().width + "px",
          height: currentRect().height + "px",
        }}
      >
        <WindowContext.Provider
          value={{
            setDelta,
            commitDelta,
          }}
        >
          {props.children}
        </WindowContext.Provider>
        <div
          {...top()}
          style={{
            position: "absolute",
            left: 0,
            top: TARGET_INSET,
            width: "100%",
            height: TARGET_SIZE,
            cursor: "ns-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...left()}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            left: TARGET_INSET,
            width: TARGET_SIZE,
            cursor: "ew-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...right()}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            right: TARGET_INSET,
            width: TARGET_SIZE,
            cursor: "ew-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...bottom()}
          style={{
            position: "absolute",
            left: 0,
            bottom: TARGET_INSET,
            width: "100%",
            height: TARGET_SIZE,
            cursor: "ns-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...topLeft()}
          style={{
            position: "absolute",
            left: TARGET_INSET,
            top: TARGET_INSET,
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            cursor: "nwse-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...topRight()}
          style={{
            position: "absolute",
            right: TARGET_INSET,
            top: TARGET_INSET,
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            cursor: "nesw-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...bottomLeft()}
          style={{
            position: "absolute",
            left: TARGET_INSET,
            bottom: TARGET_INSET,
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            cursor: "nesw-resize",
            "touch-action": "none",
          }}
        />
        <div
          {...bottomRight()}
          style={{
            position: "absolute",
            right: TARGET_INSET,
            bottom: TARGET_INSET,
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            cursor: "nwse-resize",
            "touch-action": "none",
          }}
        />
      </div>
    </Portal>
  );
}

export function useWindowDrag() {
  const { setDelta, commitDelta } = useContext(WindowContext);

  return useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      setDelta?.({ x: mx, y: my, width: 0, height: 0 });
    } else {
      commitDelta?.({ x: mx, y: my, width: 0, height: 0 });
    }
  });
}

export function WindowDragArea(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const { setDelta, commitDelta } = useContext(WindowContext);

  const drag = useDrag(({ down, movement: [mx, my] }) => {
    if (down) {
      setDelta?.({ x: mx, y: my, width: 0, height: 0 });
    } else {
      commitDelta?.({ x: mx, y: my, width: 0, height: 0 });
    }
  });

  return <div {...props} {...drag()}></div>;
}
