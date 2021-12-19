import { readFileIntoStringArray } from '../utils/files';
import { mostCommonMinusLeastCommon, mostCommonMinusLeastCommonV2, polymerize, polymerizeV2 } from './solution';

describe('14a', () => {
    it('polymerize sample data for 10 steps will return count of B 1749, C 298, H 161, N 865', () => {
        const data = [
            'NNCB',
            '',
            'CH -> B',
            'HH -> N',
            'CB -> H',
            'NH -> C',
            'HB -> C',
            'HC -> B',
            'HN -> C',
            'NN -> C',
            'BH -> H',
            'NC -> B',
            'NB -> B',
            'BN -> B',
            'BB -> N',
            'BC -> B',
            'CC -> N',
            'CN -> C',
        ]

        const result = polymerize(data, 10);
        expect(result.B).toEqual(1749);
        expect(result.C).toEqual(298);
        expect(result.H).toEqual(161);
        expect(result.N).toEqual(865);
    });

    it('polymerize with input file data for 10 times should return count of B, C, H, N', () => {
        const data = readFileIntoStringArray('./src/14/input.txt');
        const result = polymerize(data, 10);
        expect(result.B).toEqual(818);
        expect(result.C).toEqual(2905);
        expect(result.H).toEqual(735);
        expect(result.N).toEqual(2895);
    });

    it('mostCommonMinusLeastCommon with input file should return 2170', () => {
        const data = readFileIntoStringArray('./src/14/input.txt');
        expect(mostCommonMinusLeastCommon(data)).toEqual(2170);
    })
});

describe('14b', () => {
    it('polymerizeV2 sample data for 10 steps will return count of B 1749, C 298, H 161, N 865', () => {
        const data = [
            'NNCB',
            '',
            'CH -> B',
            'HH -> N',
            'CB -> H',
            'NH -> C',
            'HB -> C',
            'HC -> B',
            'HN -> C',
            'NN -> C',
            'BH -> H',
            'NC -> B',
            'NB -> B',
            'BN -> B',
            'BB -> N',
            'BC -> B',
            'CC -> N',
            'CN -> C',
        ]

        const result = polymerizeV2(data, 10);
        expect(result.B).toEqual(1749);
        expect(result.C).toEqual(298);
        expect(result.H).toEqual(161);
        expect(result.N).toEqual(865);
    });

    it('polymerizeV2 with input file data for 10 times should return count of B, C, H, N', () => {
        const data = readFileIntoStringArray('./src/14/input.txt');
        const result = polymerizeV2(data, 10);
        expect(result.B).toEqual(818);
        expect(result.C).toEqual(2905);
        expect(result.H).toEqual(735);
        expect(result.N).toEqual(2895);
    });

    it('mostCommonMinusLeastCommonV2 with input file should return 2422444761283', () => {
        const data = readFileIntoStringArray('./src/14/input.txt');
        expect(mostCommonMinusLeastCommonV2(data)).toEqual(2422444761283);
    })
})