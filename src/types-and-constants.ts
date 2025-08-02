export type XY = { x: number; y: number };
export type Circle = XY & { r: number };
export type Rect = { top: number; left: number; bottom: number; right: number };
export type LineSegment = [XY, XY];

export const _90_DEG_LEFT = Math.PI * 0.5;
export const _90_DEG_RIGHT = Math.PI * -0.5;
export const _360_DEG = Math.PI * 2;
export const _DEG = Math.PI / 180;
export const _extreme = 10 ** 30;
