import { _360_DEG, Circle, XY } from './types-and-constants';

function getVectorX(magnitude: number, direction: number) {
  return magnitude * Math.sin(direction);
}
function getVectorY(magnitude: number, direction: number) {
  return magnitude * Math.cos(direction);
}

export const xy = (x: number, y: number): XY => ({ x, y });
export function getXYVector(magnitude: number, direction: number): XY {
  return { x: getVectorX(magnitude, direction), y: getVectorY(magnitude, direction) };
}

/**
 * Returns a heading in radians describing the direction of an XY vector.
 * With zero representing a postive Y.
 * May return a negative number.
 */
export const getHeading = (vector: XY): number => {
  const { x, y } = vector;
  if (x == 0 && y == 0) {
    return 0;
  }
  if (y == 0 && x != 0) {
    return x < 0 ? Math.PI * 1.5 : Math.PI * 0.5;
  }
  if (x == 0 && y != 0) {
    return y > 0 ? 0 : Math.PI * 1;
  }
  return y > 0 ? Math.atan(x / y) : Math.PI + Math.atan(x / y);
};

export const normaliseHeading = (h: number): number => {
  const hr = h % _360_DEG;
  return hr > 0 ? hr : _360_DEG + hr;
};
export const getVectorFrom = (p1: XY, p2: XY): XY => ({
  x: p2.x - p1.x,
  y: p2.y - p1.y,
});

export const getHeadingFrom = (p1: XY, p2: XY): number => getHeading(getVectorFrom(p1, p2));

export const translate = (position: XY, vector: XY): XY => ({
  x: position.x + vector.x,
  y: position.y + vector.y,
});

export const getDistance = (p1: XY, p2: XY): number => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};


export const doCircleIntersect = (c1: Circle, c2: Circle): boolean => {
  return getDistance(c1, c2) < c1.r + c2.r;
};

export const findClosestAndDistance = <T extends XY>(list: T[], point: XY): { item?: T; distance: number } => {
  if (list.length === 0) {
    return { distance: Infinity };
  }

  const itemsWithDistances = list.map((item) => {
    return { item, distance: getDistance(point, item) };
  });

  let [closestSoFar] = itemsWithDistances;
  itemsWithDistances.forEach((nextItem) => {
    if (closestSoFar.distance > nextItem.distance) {
      closestSoFar = nextItem;
    }
  });
  return closestSoFar;
};

export const findRotationBetweenHeadings = (start: number, end: number): number => {
  const normalisedStart = normaliseHeading(start);
  const normalisedTarget = normaliseHeading(end);
  let adjustedTarget = normalisedTarget;
  if (normalisedStart - normalisedTarget > _360_DEG / 2) {
    adjustedTarget = normalisedTarget + _360_DEG;
  } else if (normalisedStart - normalisedTarget < -_360_DEG / 2) {
    adjustedTarget = normalisedTarget - _360_DEG;
  }
  return adjustedTarget - normalisedStart;
};

