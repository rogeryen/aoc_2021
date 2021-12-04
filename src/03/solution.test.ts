import { calculateLifeSupportRating, calculatePowerConsumption, findRating, RatingType } from './solution';
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

describe('day 3b', () => {
    it('should return the only number as oxygen generator rating if input is array of one', () => {
        const oxygenRating = findRating(['1010'], RatingType.Oxygen);
        expect(oxygenRating).toEqual('1010');
    });

    it('should return 1111 as oxygen rating if input has three elements with 1 as common bit', () => {
        expect(findRating(['1010', '0101', '1111'], RatingType.Oxygen)).toEqual('1111');
    });

    it('should return only number as co2 rating if input is array of one', () => {
        expect(findRating(['1010'], RatingType.Co2)).toEqual('1010');
    });

    it('should return 0101 as oxygen rating if input has three elements', () => {
        expect(findRating(['1010', '0101', '1111'], RatingType.Co2)).toEqual('0101');
    });

    it('should return only number times itself in decimal as life support rating if input is array of one', () => {
        expect(calculateLifeSupportRating(['1010'])).toEqual(100);
    })

    it('should return 1111 * 0101 in decimal as life support rating if input has three elements', () => {
        expect(calculateLifeSupportRating(['1010', '0101', '1111'])).toEqual(75);
    })

    it('should return 1662846 as life support rating with input file', () => {
        const data = readFileIntoStringArray('./src/03/input.txt');
        expect(calculateLifeSupportRating(data)).toEqual(1662846);
    })
})