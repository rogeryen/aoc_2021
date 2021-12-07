import { decrement, simulate, simulateSum256 } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('6a', () => {
    it('decrement 0 should return 6 and 8', () => {
        const { fish, newFish } = decrement(0);
        expect(fish).toEqual(6);
        expect(newFish).toEqual(8);
    });

    it('decrement 1 should return 0 and undefined', () => {
        const { fish, newFish } = decrement(1);
        expect(fish).toEqual(0);
        expect(newFish).toEqual(undefined);
    });

    it('decrement 1 9 times should get two newFish of 8 and final fish value of 6', () => {
        let fish = 1;
        const newFishs = [];
        for (let i = 0; i < 9; i++) {
            const ret = decrement(fish);
            fish = ret.fish;
            if (ret.newFish) {
                newFishs.push(ret.newFish);
            }
        }
        expect(fish).toEqual(6);
        expect(newFishs).toEqual([8, 8]);
    });

    it('simulate with [1] and 9 days should return [6, 1, 8]', () => {
        const fishs = simulate([1], 9);
        expect(fishs).toEqual([6, 1, 8]);
    });

    it('simulate with input file and 80 days should return 363101 numbers', () => {
        const data = readFileIntoStringArray('./src/06/input.txt');
        const numbersStr = data[0].split(',');
        const numbers = numbersStr.map(element => parseInt(element));
        expect(simulate(numbers, 80).length).toEqual(363101);
    });

    it('simulateSum256 with input file should return 1644286074024 numbers', () => {
        const data = readFileIntoStringArray('./src/06/input.txt');
        const numbersStr = data[0].split(',');
        const numbers = numbersStr.map(element => parseInt(element));

        expect(simulateSum256(numbers)).toEqual(1644286074024);
    });

});
