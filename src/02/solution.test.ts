import { calculatePositionValue, calculatePositionValueWithAim } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('day 2a', () => {
    it('should return 0 if only one forward', () => {
        const input = ['forward 1'];
        const value = calculatePositionValue(input);
        expect(value).toEqual(0);
    });

    it('should return 0 if only one down', () => {
        const input = ['down 1'];
        const value = calculatePositionValue(input);
        expect(value).toEqual(0);
    });

    it('should return 0 if only one up', () => {
        const input = ['up 1'];
        const value = calculatePositionValue(input);
        expect(value).toEqual(0);
    });

    it('should return 0 if forward 2 and no change in depth', () => {
        const input = ['forward 2', 'down 1', 'up 1'];
        const value = calculatePositionValue(input);
        expect(value).toEqual(0);
    });

    it('should return 10 if forward 2 and total 5 down', () => {
        const input = ['forward 2', 'down 6', 'up 1'];
        const value = calculatePositionValue(input);
        expect(value).toEqual(10);
    });

    it('should return 1480518 with input file', () => {
        const input = readFileIntoStringArray('./src/02/input.txt');
        const value = calculatePositionValue(input);
        expect(value).toEqual(1480518);
    });
});

describe('day 2b', () => {
    it('should return 0 with 1 forward', () => {
        const input = ['forward 1'];
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(0);
    });

    it('should return 0 with 1 forward 2 down', () => {
        const input = ['forward 1', 'down 2'];
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(0);
    });

    it('should return 12 with 1 forward 2 down 2 forward', () => {
        const input = ['forward 1', 'down 2', 'forward 2'];
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(12);
    });

    it('should return 12 with 1 forward 2 down 2 forward 2 up', () => {
        const input = ['forward 1', 'down 2', 'forward 2', 'up 2'];
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(12);
    });

    it('should return 12 with 1 forward 2 down 2 forward 2 up 2 forward', () => {
        const input = ['forward 1', 'down 2', 'forward 2', 'up 2', 'forward 2'];
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(20);
    });

    it('should return 1282809906 with input file', () => {
        const input = readFileIntoStringArray('./src/02/input.txt');
        const value = calculatePositionValueWithAim(input);
        expect(value).toEqual(1282809906);
    });
});