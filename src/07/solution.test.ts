import { calculateLeastFuelToAlign } from './solution';
import { readLineIntoNumberArray } from '../utils/files';

describe('7a', () => {
    it('calculateLeastFuelToAlign with [16,1,2,0,4,2,7,1,2,14] will return 37', () => {
        expect(calculateLeastFuelToAlign([16,1,2,0,4,2,7,1,2,14])).toEqual(37);
    });

    it('calculateLeastFuelToAlign with input file will return 329389', () => {
        const positions = readLineIntoNumberArray('./src/07/input.txt', ',');
        expect(calculateLeastFuelToAlign(positions)).toEqual(329389);
    });
});

describe('7b', () => {
    it('calculateLeastFuelToAlign with [16,1,2,0,4,2,7,1,2,14] and n(n+1)/2 modifier will return 168', () => {
        const modifier = (num: number) => num*(num+1)/2;
        expect(calculateLeastFuelToAlign([16,1,2,0,4,2,7,1,2,14], modifier)).toEqual(168);
    });

    it('calculateLeastFuelToAlign with n(n+1)/2 modifier with input file will return 86397080', () => {
        const positions = readLineIntoNumberArray('./src/07/input.txt', ',');
        const modifier = (num: number) => num*(num+1)/2;
        expect(calculateLeastFuelToAlign(positions, modifier)).toEqual(86397080);
    })
});