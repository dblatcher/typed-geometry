import { getHeading } from './geometry';


describe('getHeading', () => {
  it('defaults to zero degress for null vector', () => {
    expect(getHeading({ x: 0, y: 0 })).toEqual(0);
  });
  it('returns zero rad for just positive Y a 1 rad for negative', () => {
    expect(getHeading({ x: 0, y: 1 })).toEqual(0);
    expect(getHeading({ x: 0, y: -1 })).toEqual(Math.PI);
  });
  it('returns PI*1/2 rad (90deg) for just positive X a PI*3/2 rad (270deg) for negative', () => {
    expect(getHeading({ x: 1, y: 0 })).toEqual(Math.PI * (1 / 2));
    expect(getHeading({ x: -1, y: 0 })).toEqual(Math.PI * (3 / 2));
  });
  it('gets angles correct to reasonable degree of accuracy', () => {
    expect(getHeading({ x: 10, y: 10 }).toPrecision(10)).toEqual((Math.PI * (1 / 4)).toPrecision(10)); // 45 degrees
    expect(getHeading({ x: -10, y: 10 }).toPrecision(10)).toEqual((-Math.PI * (1 / 4)).toPrecision(10)); // -45 degrees
    expect(getHeading({ x: 1, y: Math.sqrt(3) }).toPrecision(10)).toEqual((Math.PI * (1 / 6)).toPrecision(10)); // 30 degrees
  });
});
