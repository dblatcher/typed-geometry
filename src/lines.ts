import { LineSegment, XY } from './types-and-constants';

// Given three colinear XYs p, q, r, the function checks if
// XY q lies on line segment 'pr'
function onSegment(p: XY, q: XY, r: XY) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  ) {
    return true;
  }
  return false;
}

enum Orientation {
  Colinear,
  Clockwise,
  Counterclockwise,
}

// To find orientation of ordered triplet (p, q, r).
function orientation(p: XY, q: XY, r: XY): Orientation {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val == 0) return Orientation.Colinear; // colinear
  return val > 0 ? Orientation.Clockwise : Orientation.Counterclockwise; // clock or counterclock wise
}

export const isPointOnLineSegment = (point: XY, segment: LineSegment) =>
  orientation(point, ...segment) === Orientation.Colinear ? onSegment(segment[0], point, segment[1]) : false;

/**
 * Check if two line segments will intersect
 *
 * @param segment1 the two XYs of the first segment
 * @param segment2 the two XYs of the second segment
 * @returns whether the segments intersect
 */
export function doLineSegmentsIntersect(segment1: [XY, XY], segment2: [XY, XY]): boolean {
  // Find the four orientations needed for general and
  // special cases
  const o1 = orientation(segment1[0], segment1[1], segment2[0]);
  const o2 = orientation(segment1[0], segment1[1], segment2[1]);
  const o3 = orientation(segment2[0], segment2[1], segment1[0]);
  const o4 = orientation(segment2[0], segment2[1], segment1[1]);

  // General case
  if (o1 != o2 && o3 != o4) {
    return true;
  }

  // Special Cases
  // segment1[0], segment1[1] and segment2[0] are colinear and segment2[0] lies on segment p1q1
  if (o1 == 0 && onSegment(segment1[0], segment2[0], segment1[1])) {
    return true;
  }

  // segment1[0], segment1[1] and segment2[1] are colinear and segment2[1] lies on segment p1q1
  if (o2 == 0 && onSegment(segment1[0], segment2[1], segment1[1])) {
    return true;
  }

  // segment2[0], segment2[1] and segment1[0] are colinear and segment1[0] lies on segment p2q2
  if (o3 == 0 && onSegment(segment2[0], segment1[0], segment2[1])) {
    return true;
  }

  // segment2[0], segment2[1] and segment1[1] are colinear and segment1[1] lies on segment p2q2
  if (o4 == 0 && onSegment(segment2[0], segment1[1], segment2[1])) {
    return true;
  }

  return false; // Doesn't fall in any of the above cases
}
