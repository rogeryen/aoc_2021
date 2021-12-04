import { calculatePowerConsumption } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('day 3a', () => {
    it('should return 0 with empty input', () => {
        expect(calculatePowerConsumption([])).toEqual(0);
    });

    it('should return 0 with 1 or 0 as input', () => {
        expect(calculatePowerConsumption(['0'])).toEqual(0);
        expect(calculatePowerConsumption(['1'])).toEqual(0);
    });

    it('should return 2 with 10 and 10 as input', () => {
        expect(calculatePowerConsumption(['10', '10'])).toEqual(2);
    });

    it('should return 2954600 with input file', () => {
        const data = readFileIntoStringArray('./src/03/input.txt');
        expect(calculatePowerConsumption(data)).toEqual(2954600);
    })
});