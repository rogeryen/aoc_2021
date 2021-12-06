import { parseLine, isHorizontalOrVertical, getLinePoints, countIntersectPoints } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('5a', () => {
    it('parseLine should return x1 y1 x2 y2', () => {
        const result = parseLine('424,924 -> 206,706');
        expect(result.p1.x).toEqual(424);
        expect(result.p1.y).toEqual(924);
        expect(result.p2.x).toEqual(206);
        expect(result.p2.y).toEqual(706);
    });

    it('isHorizontalOrVertical should return true for lines where x1=x2 or y1=y2', () => {
        const horizontal = {p1: {x: 0, y: 0}, p2: {x: 5, y: 0}};
        expect(isHorizontalOrVertical(horizontal)).toEqual(true);

        const vertical = {p1: {x: 0, y: 0}, p2: {x: 0, y: 5}};
        expect(isHorizontalOrVertical(vertical)).toEqual(true);

        const slope = {p1: {x: 0, y: 0}, p2:{x: 5, y: 5}};
        expect(isHorizontalOrVertical(slope)).toEqual(false);
    });

    it('getLinePoints will return 0:0, 0:1, 0:2, 0:3 between 0:0 and 0:3', () => {
        const points = getLinePoints({p1: {x:0, y:0}, p2: {x:0, y:3}});
        expect(points).toEqual([{x: 0, y:0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}]);
    });

    it('getLinePoints will return 0:0, 1:0, 2:0, 3:0 between 0:0 and 3:0', () => {
        const points = getLinePoints({p1: {x:0, y:0}, p2: {x:3, y:0}});
        expect(points).toEqual([{x: 0, y:0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}]);
    });

    it('getLinePoints will return 0:0, 0:1, 0:2, 0:3 between 0:3 and 0:0', () => {
        const points = getLinePoints({p1: {x:0, y:3}, p2: {x:0, y:0}});
        expect(points).toEqual([{x: 0, y:0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}]);
    });

    it('getLinePoints will return 0:0, 1:0, 2:0, 3:0 between 3:0 and 0:0', () => {
        const points = getLinePoints({p1: {x:0, y:0}, p2: {x:3, y:0}});
        expect(points).toEqual([{x: 0, y:0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}]);
    });

    it('countIntersectPoints will return 0 with no intersected lines', () => {
        const lines = [
            '0,0 -> 3,0',
            '4,0 -> 5,0',
            '1,1 -> 1,3',
            '5,1 -> 5,5'
        ];

        expect(countIntersectPoints(lines, true)).toEqual(0);
    });

    it('countIntersectPoints will return 1 with 2 intersected lines', () => {
        const lines = [
            '0,0 -> 3,0',
            '3,0 -> 5,0'
        ];

        expect(countIntersectPoints(lines, true)).toEqual(1);
    });

    it('countIntersectPoints will return 1 with 3 intersected lines', () => {
        const lines = [
            '0,0 -> 3,0',
            '0,0 -> 0,1',
            '0,0 -> -1,0'
        ];

        expect(countIntersectPoints(lines, true)).toEqual(1);
    });

    it('countIntersectPoints will return 2 with 1 line intersecting with two others on either end', () => {
        const lines = [
            '3,3 -> 10,3',
            '4,0 -> 4,5',
            '9,1 -> 9,10'
        ];

        expect(countIntersectPoints(lines, true)).toEqual(2);
    });

    it('countIntersectPoints will return 5147 with input file', () => {
        const data = readFileIntoStringArray('./src/05/input.txt');
        expect(countIntersectPoints(data, true)).toEqual(5147);
    });
});

describe('5b', () => {
    it('getLinePoints will return 00 11 22 33 44 between 00 and 44', () => {
        const points = getLinePoints({p1: {x: 0, y: 0}, p2: {x: 4, y: 4}});
        expect(points).toEqual([{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 4}]);
    });

    it('getLinePoints will return 79 88 97 106 between 7,9 and 10,6', () => {
        const points = getLinePoints({p1: {x: 7, y: 9}, p2: {x: 10, y: 6}});
        expect(points).toEqual([{x: 7, y: 9}, {x: 8, y: 8}, {x: 9, y: 7}, {x: 10, y: 6}]);
    });

    it('countIntersectPoints will return 2 with 1 diagonal line intersecting with two horizontal lines', () => {
        const lines = [
            '0,0 -> 6,6',
            '0,1 -> 5,1',
            '3,5 -> 10,5'
        ];

        expect(countIntersectPoints(lines, false)).toEqual(2);
    });

    it('countIntersectPoints will return 16925 with input file', () => {
        const data = readFileIntoStringArray('./src/05/input.txt');
        expect(countIntersectPoints(data, false)).toEqual(16925);
    });
});