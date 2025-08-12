import { Rect, XY } from "./types-and-constants";



const oneVerticalyContainsTheOther = (r1: Rect, r2: Rect): boolean => {
  return (r1.bottom <= r2.bottom && r1.top >= r2.top) || (r2.bottom <= r1.bottom && r2.top >= r1.top);
};
const oneHorizontallyContainsTheOther = (r1: Rect, r2: Rect): boolean => {
  return (r1.right <= r2.right && r1.left >= r2.left) || (r2.right <= r1.right && r2.left >= r1.left);
};

/**
 * Tests if a point is inside a Rect, excluding points on the edge
 */
export const isPointInsideRect = (point: XY, rect: Rect): boolean => {
  const { top, left, bottom, right } = rect;
  return !(point.y <= top || point.y >= bottom || point.x <= left || point.x >= right);
};

/**
 * Checks for intersection between Rects
 */
export const doRectsIntersect = (r1: Rect, r2: Rect): boolean => {
  return (
    isPointInsideRect({ x: r1.left, y: r1.top }, r2) ||
    isPointInsideRect({ x: r1.left, y: r1.bottom }, r2) ||
    isPointInsideRect({ x: r1.right, y: r1.top }, r2) ||
    isPointInsideRect({ x: r1.right, y: r1.bottom }, r2) ||
    isPointInsideRect({ x: r2.left, y: r2.top }, r1) ||
    isPointInsideRect({ x: r2.left, y: r2.bottom }, r1) ||
    isPointInsideRect({ x: r2.right, y: r2.top }, r1) ||
    isPointInsideRect({ x: r2.right, y: r2.bottom }, r1) ||
    (oneHorizontallyContainsTheOther(r1, r2) && oneVerticalyContainsTheOther(r1, r2)) ||
    (oneHorizontallyContainsTheOther(r1, r2) &&
      ((r1.top >= r2.top && r1.top <= r2.bottom) || (r2.top >= r1.top && r2.top <= r1.bottom))) ||
    (oneVerticalyContainsTheOther(r1, r2) &&
      ((r1.left >= r2.left && r1.left <= r2.right) || (r2.left >= r1.left && r2.left <= r1.right)))
  );
};

export const expandRect = (rect: Rect, margin: number): Rect => ({
  top: rect.top - margin,
  bottom: rect.bottom + margin,
  left: rect.left - margin,
  right: rect.right + margin,
});
