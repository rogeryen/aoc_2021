import { simulateSteps, simulateUntilFirstSynchronizedFlash } from './solution';
import { readFileIntoNumberArrays } from '../utils/files';

describe('11a', () => {
    it('simulateSteps with 100 and sample input will return 1656', () => {
        const data = [
            [5,4,8,3,1,4,3,2,2,3],
            [2,7,4,5,8,5,4,7,1,1],
            [5,2,6,4,5,5,6,1,7,3],
            [6,1,4,1,3,3,6,1,4,6],
            [6,3,5,7,3,8,5,4,7,8],
            [4,1,6,7,5,2,4,6,4,5],
            [2,1,7,6,8,4,1,7,2,1],
            [6,8,8,2,8,8,1,1,3,4],
            [4,8,4,6,8,4,8,5,5,4],
            [5,2,8,3,7,5,1,5,2,6]
        ]
        expect(simulateSteps(data, 100)).toEqual(1656);
    });
    it('simulateSteps with 100 and input file will return 1705', () => {
        const data = readFileIntoNumberArrays('./src/11/input.txt');
        expect(simulateSteps(data, 100)).toEqual(1705);
    });
});

describe('11b', () => {
    it('simulateUntilFirstSynchronizedFlash with input file will return 265', () => {
        const data = readFileIntoNumberArrays('./src/11/input.txt');
        expect(simulateUntilFirstSynchronizedFlash(data)).toEqual(265);
    });
});