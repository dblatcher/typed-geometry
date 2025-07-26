import { getHeading, isPointInsideRect, Rect } from "./geometry";

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