import {
  Accessor,
  ComponentProps,
  createContext,
  createMemo,
  createSignal,
  JSX,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useDrag } from "../use-gesture";
import { DesktopContext } from "./desktop";
import { Rect } from "./types";
import {
  addRect,
  getHorizontalComponent,
  getVerticalComponent,
  multiplyRect,
  rectIsFullyContained,
  truncate,
} from "./utils";

export type FrameContextType = {
  rect: Accessor<Rect>;
  setRect: (rect: Rect) => void;
  dragRectBy: (delta: Rect) => void;
  commitDrag: () => void;
};
export const FrameContext = createContext<FrameContextType>({
  rect: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  setRect: () => {},
  dragRectBy: () => {},
  commitDrag: () => {},
});

export type FrameProps = {
  initialWidth: number;
  initialHeight: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  children?: JSX.Element;
  style?: JSX.CSSProperties;
  onMouseDown?: () => void;
};
export function Frame(props: FrameProps) {
  const ctx = useContext(DesktopContext);
  const [rectBeforeDrag, setRectBeforeDrag] = createSignal<Rect>(
    getInitialFrameRect(ctx.rect(), props.initialWidth, props.initialHeight)
  );
  const [unboundedDragDelta, setUnboundedDragDelta] = createStore<Rect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const boundedDragDelta = createMemo(() => {
    const desktopRect = ctx.rect();
    function getIsWithinConstraints(rect: Rect): boolean {
      return (
        rectIsFullyContained(desktopRect, rect) &&
        (!props.minWidth || rect.width >= props.minWidth) &&
        (!props.minHeight || rect.height >= props.minHeight) &&
        (!props.maxWidth || rect.width <= props.maxWidth) &&
        (!props.maxHeight || rect.height <= props.maxHeight)
      );
    }

    const horizontalBoundedDelta = getBoundedDelta(
      rectBeforeDrag(),
      getHorizontalComponent(unboundedDragDelta),
      getIsWithinConstraints
    );
    const verticalBoundedDelta = getBoundedDelta(
      rectBeforeDrag(),
      getVerticalComponent(unboundedDragDelta),
      getIsWithinConstraints
    );
    return addRect(horizontalBoundedDelta, verticalBoundedDelta);
  });
  const rect = createMemo(() => addRect(rectBeforeDrag(), boundedDragDelta()));

  function dragRectBy(delta: Rect) {
    setUnboundedDragDelta(addRect(unboundedDragDelta, delta));
  }
  function commitDrag() {
    setRectBeforeDrag(addRect(rectBeforeDrag(), boundedDragDelta()));
    setUnboundedDragDelta({ x: 0, y: 0, width: 0, height: 0 });
  }

  return (
    <FrameContext.Provider
      value={{
        rect: () => rectBeforeDrag(),
        setRect: (rect: Rect) => {
          setRectBeforeDrag(rect);
          setUnboundedDragDelta({ x: 0, y: 0, width: 0, height: 0 });
        },
        dragRectBy,
        commitDrag,
      }}
    >
      <div
        style={{
          position: "fixed",
          width: rect().width + "px",
          height: rect().height + "px",
          left: rect().x + "px",
          top: rect().y + "px",
          ...props.style,
        }}
        onMouseDown={(e) => {
          props.onMouseDown?.();
        }}
      >
        {props.children}
      </div>
    </FrameContext.Provider>
  );
}

export function FrameDragArea(props: ComponentProps<"div">) {
  const ctx = useContext(FrameContext);

  const drag = useDrag(({ pressed, delta: [dx, dy] }) => {
    if (pressed) {
      ctx.dragRectBy?.({ x: dx, y: dy, width: 0, height: 0 });
    } else {
      ctx.commitDrag?.();
    }
  });

  return <div {...props} {...drag()} />;
}

export function ResizableFrame(props: FrameProps) {
  return (
    <Frame {...props}>
      {props.children}
      <ResizeHandles />
    </Frame>
  );
}

const RESIZE_TARGET_SIZE = "8px";
const RESIZE_TARGET_INSET = "-4px";

function ResizeHandles() {
  const ctx = useContext(FrameContext);

  const createHandler = (
    getDelta: ([mx, my]: [number, number], altKey: boolean) => Rect
  ) => {
    return useDrag(({ pressed, delta: [dx, dy], altKey }) => {
      if (pressed) {
        ctx.dragRectBy(getDelta([dx, dy], altKey));
      } else {
        ctx.commitDrag();
      }
    });
  };

  const top = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: 0,
          y: dy,
          width: 0,
          height: -dy * 2,
        }
      : {
          x: 0,
          y: dy,
          width: 0,
          height: -dy,
        }
  );

  const bottom = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: 0,
          y: -dy,
          width: 0,
          height: dy * 2,
        }
      : {
          x: 0,
          y: 0,
          width: 0,
          height: dy,
        }
  );

  const left = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: dx,
          y: 0,
          width: -dx * 2,
          height: 0,
        }
      : {
          x: dx,
          y: 0,
          width: -dx,
          height: 0,
        }
  );

  const right = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: -dx,
          y: 0,
          width: dx * 2,
          height: 0,
        }
      : {
          x: 0,
          y: 0,
          width: dx,
          height: 0,
        }
  );

  const topLeft = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: dx,
          y: dy,
          width: -dx * 2,
          height: -dy * 2,
        }
      : {
          x: dx,
          y: dy,
          width: -dx,
          height: -dy,
        }
  );

  const topRight = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: -dx,
          y: dy,
          width: dx * 2,
          height: -dy * 2,
        }
      : {
          x: 0,
          y: dy,
          width: dx,
          height: -dy,
        }
  );

  const bottomLeft = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: dx,
          y: -dy,
          width: -dx * 2,
          height: dy * 2,
        }
      : {
          x: dx,
          y: 0,
          width: -dx,
          height: dy,
        }
  );

  const bottomRight = createHandler(([dx, dy], altKey) =>
    altKey
      ? {
          x: -dx,
          y: -dy,
          width: dx * 2,
          height: dy * 2,
        }
      : {
          x: 0,
          y: 0,
          width: dx,
          height: dy,
        }
  );
  return (
    <>
      <div
        {...top()}
        style={{
          position: "absolute",
          left: 0,
          top: RESIZE_TARGET_INSET,
          width: "100%",
          height: RESIZE_TARGET_SIZE,
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
          left: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
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
          right: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
          cursor: "ew-resize",
          "touch-action": "none",
        }}
      />
      <div
        {...bottom()}
        style={{
          position: "absolute",
          left: 0,
          bottom: RESIZE_TARGET_INSET,
          width: "100%",
          height: RESIZE_TARGET_SIZE,
          cursor: "ns-resize",
          "touch-action": "none",
        }}
      />
      <div
        {...topLeft()}
        style={{
          position: "absolute",
          left: RESIZE_TARGET_INSET,
          top: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
          height: RESIZE_TARGET_SIZE,
          cursor: "nwse-resize",
          "touch-action": "none",
        }}
      />
      <div
        {...topRight()}
        style={{
          position: "absolute",
          right: RESIZE_TARGET_INSET,
          top: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
          height: RESIZE_TARGET_SIZE,
          cursor: "nesw-resize",
          "touch-action": "none",
        }}
      />
      <div
        {...bottomLeft()}
        style={{
          position: "absolute",
          left: RESIZE_TARGET_INSET,
          bottom: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
          height: RESIZE_TARGET_SIZE,
          cursor: "nesw-resize",
          "touch-action": "none",
        }}
      />
      <div
        {...bottomRight()}
        style={{
          position: "absolute",
          right: RESIZE_TARGET_INSET,
          bottom: RESIZE_TARGET_INSET,
          width: RESIZE_TARGET_SIZE,
          height: RESIZE_TARGET_SIZE,
          cursor: "nwse-resize",
          "touch-action": "none",
        }}
      />
    </>
  );
}

// -------------------------------------------------------------------------------------------------

export function getInitialFrameRect(
  desktopRect: Rect,
  basisWidth: number,
  basisHeight: number
): Rect {
  const width = Math.min(desktopRect.width, basisWidth);
  const height = Math.min(desktopRect.height, basisHeight);
  return {
    x: (desktopRect.width - width) / 2 + desktopRect.x,
    y: (desktopRect.height - height) / 2 + desktopRect.y,
    width,
    height,
  };
}

function getBoundedDelta(
  rect: Rect,
  delta: Rect,
  fitsConstraintsFn: (rect: Rect) => boolean
): Rect {
  if (!fitsConstraintsFn(rect)) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }
  if (fitsConstraintsFn(addRect(rect, delta))) {
    return delta;
  }

  const absoluteMaxValue = getAbsoluteMaxValue(delta);
  let inclusiveMaxValue = absoluteMaxValue;
  let inclusiveMinValue = 0;

  while (Math.abs(inclusiveMaxValue - inclusiveMinValue) > 0.25) {
    let middleValue = (inclusiveMaxValue + inclusiveMinValue) / 2;
    let multiplier = middleValue / absoluteMaxValue;
    let boundedDelta = multiplyRect(delta, multiplier);
    if (fitsConstraintsFn(addRect(rect, boundedDelta))) {
      inclusiveMinValue = middleValue;
    } else {
      inclusiveMaxValue = middleValue;
    }
  }
  let multiplier = inclusiveMinValue / absoluteMaxValue;
  return truncate(multiplyRect(delta, multiplier));
}

function getAbsoluteMaxValue(rect: Rect) {
  return Math.max(
    Math.abs(rect.width),
    Math.abs(rect.height),
    Math.abs(rect.x),
    Math.abs(rect.y)
  );
}
