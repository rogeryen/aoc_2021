import { countIncreases, countIncreasesInThrees } from './solution';
import fs = require('fs');

describe('day 1a', () => {
    it('should return 0 if only 1 level of depth', () => {
        const count = countIncreases([100]);
        expect(count).toEqual(0);
    });

    it('should return 1 with 2 levels of increasing depths', () => {
        expect(countIncreases([100, 101])).toEqual(1);
    });

    it('should return 0 with 2 levels of decreasing depths', () => {
        expect(countIncreases([101, 100])).toEqual(0);
    });

    it('should return 1583 with input file', () => {
        const data = fs.readFileSync('./src/01/input.txt').toString().split('\n');
        const intArray = data.map((v) => parseInt(v))
        expect(countIncreases(intArray)).toEqual(1583);
    });
});

describe('day 1b', () => {
    it('should return 0 if array size less than 4', () => {
        expect(countIncreasesInThrees([1])).toEqual(0);
        expect(countIncreasesInThrees([1, 2])).toEqual(0);
        expect(countIncreasesInThrees([1, 2, 3])).toEqual(0);
    });

    it('should return 1 if first element is less than fourth in array size of 4', () => {
        expect(countIncreasesInThrees([1, 2, 3, 4])).toEqual(1);
    });

    it('should return 2 if array has 5 consecutively increasing numbers', () => {
        expect(countIncreasesInThrees([1, 2, 3, 4, 5])).toEqual(2);
    });

    it('should return 1 if array has 4 consecutively increasing numbers followed by 1 smallest number', () => {
        expect(countIncreasesInThrees([1, 2, 3, 4, 0])).toEqual(1);
    });

    it('should return 1627 with input file', () => {
        const data = fs.readFileSync('./src/01/input.txt').toString().split('\n');
        const intArray = data.map((v) => parseInt(v))
        expect(countIncreasesInThrees(intArray)).toEqual(1627);
    });
});