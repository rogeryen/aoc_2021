import { readFileIntoStringArray } from '../utils/files';
import { lowestCostPath } from './solution';

describe('15a', () => {
    it('lowestCostPath with sample input should return 40', () => {
        const data = [
            '1163751742',
            '1381373672',
            '2136511328',
            '3694931569',
            '7463417111',
            '1319128137',
            '1359912421',
            '3125421639',
            '1293138521',
            '2311944581',
        ]

        expect(lowestCostPath(data)).toEqual(40);
    });
    it('lowestCostPath with input file should return 388', () => {
        const data = readFileIntoStringArray('./src/15/input.txt');
        expect(lowestCostPath(data)).toEqual(388);
    });
});