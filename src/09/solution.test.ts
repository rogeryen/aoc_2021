import { getLowpoints, calculateRiskLevel } from './solution';
import { readFileIntoNumberArrays } from '../utils/files';

describe('9a', () => {
    it('getLowpoints with sample input will return [1, 0, 5, 5]', () => {
        const heightMap: number[][] = [
            [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
            [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
            [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
            [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
            [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
        ]
        expect(getLowpoints(heightMap)).toEqual([1, 0, 5, 5]);
    })

    it('calculateRiskLevel with sample input will return 15', () => {
        const heightMap: number[][] = [
            [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
            [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
            [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
            [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
            [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
        ]
        expect(calculateRiskLevel(heightMap)).toEqual(15);
    });

    it('calculateRiskLevel with input file will return 496', () => {
        const heightMap = readFileIntoNumberArrays('./src/09/input.txt');
        expect(calculateRiskLevel(heightMap)).toEqual(496);
    });
});
