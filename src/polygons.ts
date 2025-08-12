import { doLineSegmentsIntersect, isPointOnLineSegment } from './lines';
import { _extreme, XY } from './types-and-constants';

/**
 * @param point
 * @param polygon
 * @returns if the XY is inside the polygon
 */
export function isPointInsidePolygon(point: XY, polygon: XY[]) {
  const n = polygon.length;
  if (n < 3) {
    return false;
  }
  const extremeXPoint = { y: point.y, x: _extreme };

  const testLine: [XY, XY] = [point, extremeXPoint];

  let intersectionsWithEdges = 0;
  let XY1, XY2;
  for (let i = 0; i < polygon.length; i++) {
    XY1 = polygon[i];
    XY2 = i + 1 >= polygon.length ? polygon[0] : polygon[i + 1];
    if (doLineSegmentsIntersect(testLine, [XY1, XY2])) {
      intersectionsWithEdges++;
    }
  }

  let intersectionsWithVertices = 0;
  polygon.forEach((vertex) => {
    if (isPointOnLineSegment(vertex, testLine)) {
      intersectionsWithVertices++;
    }
  });

  // if the test line goes through a vertex, that will count as going through
  // two edges at the same point. So subtracing the intersectionsWithVertices
  // from intersectionsWithEdges gives the number of times the test line passed
  // in or out of the polygon
  return (intersectionsWithEdges - intersectionsWithVertices) % 2 !== 0;
}
