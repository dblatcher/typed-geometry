import { isPointInsidePolygon } from "./polygons"
import { XY } from "./types-and-constants"

describe('isPointInsidePolygon', () => {

    const diamond: XY[] = [
        { x: 5, y: 5 },
        { x: 15, y: 15 },
        { x: 5, y: 30 },
        { x: -5, y: 15 },
    ]

    it('confirms a point inside that goes through an edge if traced to extreme X', () => {
        expect(isPointInsidePolygon({ x: 5, y: 10 }, diamond)).toBe(true)
        expect(isPointInsidePolygon({ x: 5, y: 11 }, diamond)).toBe(true)
        expect(isPointInsidePolygon({ x: 3, y: 16 }, diamond)).toBe(true)
    })

    it('confirms a point inside that will pass through a vertex', () => {
        expect(isPointInsidePolygon({ x: 3, y: 15 }, diamond)).toBe(true)
        expect(isPointInsidePolygon({ x: 5, y: 15 }, diamond)).toBe(true)
        expect(isPointInsidePolygon({ x: 8, y: 15 }, diamond)).toBe(true)
    })

    it('excludes points outside', () => {
        expect(isPointInsidePolygon({ x: 5, y: 0 }, diamond)).toBe(false)
        expect(isPointInsidePolygon({ x: 5, y: 31 }, diamond)).toBe(false)
        expect(isPointInsidePolygon({ x: 0, y: 10 }, diamond)).toBe(false)
        expect(isPointInsidePolygon({ x: 12, y: 10 }, diamond)).toBe(false)
    })

    it('works with points adjacent to a vertex', () => {
        const ob = [[123, 29], [136, 47], [167, 49], [176, 13], [145, 4], [115, 7]];
        const polygon: XY[] = ob.map(point => ({ x: point[0], y: point[1] }))
        expect(isPointInsidePolygon({ x: 135, y: 29 }, polygon)).toBe(true)
        expect(isPointInsidePolygon({ x: 153, y: 13 }, polygon)).toBe(true)
    })
})