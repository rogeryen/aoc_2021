import { getLowpoints, calculateRiskLevel, findBasin, productOfLargestThreeBasins } from './solution';
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

describe('9b', () => {
    it('findBaisin with [[0,1,2],[2,3,4],[3,4,9]] starting from 0, 0 will return [0,1,2,4,3,4,3,2] and set all elements of input to 9', () => {
        const input = [
            [0, 1, 2],
            [2, 3, 4],
            [3, 4, 9]
        ]
        expect(findBasin(input, 0, 0)).toEqual([0, 1, 2, 4, 3, 4, 3, 2]);
        expect(input).toEqual([[9, 9, 9], [9, 9, 9], [9, 9, 9]]);
    });

    it('findBaisin with [[0,1,2],[2,3,4],[3,4,9]] starting from 2, 2 will return [] and input unchanged', () => {
        const input = [
            [0, 1, 2],
            [2, 3, 4],
            [3, 4, 9]
        ]
        expect(findBasin(input, 2, 2)).toEqual([]);
        expect(input).toEqual([[0, 1, 2], [2, 3, 4], [3, 4, 9]]);
    });

    it('productOfLargestThreeBasins with sample input should return 1134', () => {
        const heightMap: number[][] = [
            [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
            [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
            [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
            [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
            [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
        ];
        expect(productOfLargestThreeBasins(heightMap)).toEqual(1134);
    });

    it('productOfLargestThreeBasins with input file should return 902880', () => {
        const heightMap = readFileIntoNumberArrays('./src/09/input.txt');
        expect(productOfLargestThreeBasins(heightMap)).toEqual(902880);
    });
})
