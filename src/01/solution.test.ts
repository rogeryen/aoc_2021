import { countIncreases } from './solution';
import fs = require('fs');

describe('day 1', () => {
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
})
