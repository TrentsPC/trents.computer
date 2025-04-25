import { Rect } from "./types";

export function multiplyRect(rect: Rect, factor: number): Rect {
  return {
    x: rect.x * factor,
    y: rect.y * factor,
    width: rect.width * factor,
    height: rect.height * factor,
  };
}

export function addRect(a: Rect, b: Rect): Rect {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    width: a.width + b.width,
    height: a.height + b.height,
  };
}

export function rectIsFullyContained(container: Rect, rect: Rect): boolean {
  return (
    // rect.x >= container.x &&
    rect.y >= container.y &&
    // rect.x + rect.width <= container.x + container.width &&
    rect.y + 52 <= container.y + container.height
  );
}

export function getHorizontalComponent(rect: Rect) {
  return {
    x: rect.x,
    y: 0,
    width: rect.width,
    height: 0,
  };
}
export function getVerticalComponent(rect: Rect) {
  return {
    x: 0,
    y: rect.y,
    width: 0,
    height: rect.height,
  };
}

export function truncate(rect: Rect) {
  return {
    x: Math.trunc(rect.x),
    y: Math.trunc(rect.y),
    width: Math.trunc(rect.width),
    height: Math.trunc(rect.height),
  };
}

export function equals(a: Rect, b: Rect) {
  return (
    a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
  );
}
