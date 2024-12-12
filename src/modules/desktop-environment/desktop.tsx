import {
  Accessor,
  createContext,
  createSignal,
  JSX,
  onCleanup,
  onMount,
} from "solid-js";
import { Insets, Rect } from "./types";

export type DesktopProps = {
  children: JSX.Element;
  insets: Insets;
};
type DesktopContextType = {
  rect: Accessor<Rect>;
};
export const DesktopContext = createContext<DesktopContextType>({
  rect: () => ({ x: 0, y: 0, width: 0, height: 0 }),
});

function getRectFromInsets(insets: Insets): Rect {
  return {
    x: insets.left,
    y: insets.top,
    width: window.innerWidth - insets.left - insets.right,
    height: window.innerHeight - insets.top - insets.bottom,
  };
}

export function Desktop(props: DesktopProps) {
  const [rect, setRect] = createSignal({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  onMount(() => {
    const updateRect = () => {
      setRect(getRectFromInsets(props.insets));
    };
    window.addEventListener("resize", updateRect);
    updateRect();
    onCleanup(() => {
      window.removeEventListener("resize", updateRect);
    });
  });

  return (
    <DesktopContext.Provider value={{ rect: rect }}>
      {props.children}
    </DesktopContext.Provider>
  );
}
