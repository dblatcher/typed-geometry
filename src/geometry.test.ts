import { doRectsIntersect, getHeading, isPointInsideRect, } from "./geometry";
import { Rect } from "./types-and-constants";

describe('isPointInsideRect', () => {

    const normalRect: Rect = {
        left: 10,
        right: 30,
        top: 10,
        bottom: 20,
    }

    it('confirms points inside', () => {
        expect(isPointInsideRect({ x: 10.1, y: 15 }, normalRect)).toBe(true)
        expect(isPointInsideRect({ x: 20, y: 15 }, normalRect)).toBe(true)
        expect(isPointInsideRect({ x: 11, y: 11 }, normalRect)).toBe(true)
        expect(isPointInsideRect({ x: 29, y: 19 }, normalRect)).toBe(true)
    })
    it('excludes points outside', () => {
        expect(isPointInsideRect({ x: 0, y: 0 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 200, y: 15 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 11, y: 101 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: -29, y: 109 }, normalRect)).toBe(false)
    })
    it('excludes points on the edges or corners', () => {
        expect(isPointInsideRect({ x: 10, y: 15 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 30, y: 15 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 20, y: 10 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 20, y: 20 }, normalRect)).toBe(false)

        expect(isPointInsideRect({ x: 10, y: 10 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 30, y: 10 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 10, y: 20 }, normalRect)).toBe(false)
        expect(isPointInsideRect({ x: 30, y: 20 }, normalRect)).toBe(false)
    })
})

describe('getHeading', () => {
    it('defaults to zero degress for null vector', () => {
        expect(getHeading({ x: 0, y: 0 })).toEqual(0)
    })
    it('returns zero rad for just positive Y a 1 rad for negative', () => {
        expect(getHeading({ x: 0, y: 1 })).toEqual(0);
        expect(getHeading({ x: 0, y: -1 })).toEqual(Math.PI);
    })
    it('returns PI*1/2 rad (90deg) for just positive X a PI*3/2 rad (270deg) for negative', () => {
        expect(getHeading({ x: 1, y: 0 })).toEqual(Math.PI * (1 / 2));
        expect(getHeading({ x: -1, y: 0 })).toEqual(Math.PI * (3 / 2));
    })
    it('gets angles correct to reasonable degree of accuracy', () => {
        expect(getHeading({ x: 10, y: 10 }).toPrecision(10)).toEqual((Math.PI * (1 / 4)).toPrecision(10)); // 45 degrees
        expect(getHeading({ x: -10, y: 10 }).toPrecision(10)).toEqual((-Math.PI * (1 / 4)).toPrecision(10)); // -45 degrees
        expect(getHeading({ x: 1, y: Math.sqrt(3) }).toPrecision(10)).toEqual((Math.PI * (1 / 6)).toPrecision(10)); // 30 degrees
    })
})

describe('doRectsIntersect', () => {
    it('confirms when one rect is inside the other', () => {
        //.111111111....
        //.112222211....
        //.112222211....
        //.112222211....
        //.111111111....
        //.111111111....
        const rect1: Rect = { top: 1, left: 1, bottom: 100, right: 50 };
        const rect2: Rect = { top: 10, left: 10, bottom: 20, right: 20 };
        expect(doRectsIntersect(rect1, rect2)).toBe(true)
        expect(doRectsIntersect(rect2, rect1)).toBe(true)
    })
    it('handles overlaps', () => {
        // .....22....
        // ..11122111.
        // .331111111.
        // .331111111.
        // ..111114444
        // ..111114444
        // .......4444

        const rect1: Rect = { top: 0, left: 0, bottom: 100, right: 50 };
        const rect2: Rect = { top: -10, left: 25, bottom: 20, right: 35 };
        const rect3: Rect = { top: 10, left: -10, bottom: 20, right: 35 };
        const rect4: Rect = { top: 80, left: 30, bottom: 120, right: 65 };
        expect(doRectsIntersect(rect1, rect2)).toBe(true)
        expect(doRectsIntersect(rect2, rect1)).toBe(true)
        expect(doRectsIntersect(rect1, rect3)).toBe(true)
        expect(doRectsIntersect(rect3, rect1)).toBe(true)
        expect(doRectsIntersect(rect1, rect4)).toBe(true)
        expect(doRectsIntersect(rect4, rect1)).toBe(true)
    })
    it ('excludes non overlapping', () => {
        const rect1: Rect = { top: 0, left: 0, bottom: 100, right: 50 };
        const rect2: Rect = { top: 150, left: 0, bottom: 200, right: 150 };
        expect(doRectsIntersect(rect1, rect2)).toBe(false)
        expect(doRectsIntersect(rect2, rect1)).toBe(false)
    })
})