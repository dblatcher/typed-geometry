import { isPointOnLineSegment } from "./polygons";

describe('isPointOnLineSegment', () => {
    it('works with verticals', () => {
        expect(isPointOnLineSegment({ x: 20, y: 30 }, [{ x: 20, y: 10 }, { x: 20, y: 40, }])).toBe(true)
        expect(isPointOnLineSegment({ x: 20, y: 30 }, [{ x: 20, y: 40 }, { x: 20, y: 50, }])).toBe(false)
    })
    it('works with horizontals', () => {
        expect(isPointOnLineSegment({ x: 20, y: 30 }, [{ x: 10, y: 30 }, { x: 50, y: 30, }])).toBe(true)
        expect(isPointOnLineSegment({ x: 20, y: 30 }, [{ x: 30, y: 30 }, { x: 50, y: 30, }])).toBe(false)
    })
})