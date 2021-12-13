import { decodeEasySignal, count1478InOutput, calculateSumOfOutputs } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('8a', () => {
    it('decodeSignal should return 1 if signal length is 2', () => {
        expect(decodeEasySignal('ab')).toEqual(1);
    });
    it('decodeSignal should return 4 if signal length is 4', () => {
        expect(decodeEasySignal('abcd')).toEqual(4);
    });
    it('decodeSignal should return 7 if signal length is 3', () => {
        expect(decodeEasySignal('abc')).toEqual(7);
    });
    it('decodeSignal should return 8 if signal length is 7', () => {
        expect(decodeEasySignal('abcdefg')).toEqual(8);
    });
    it('count1478 should return 0 for sample input', () => {
        expect(count1478InOutput(['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'])).toEqual(0);
    });
    it('count1478 should return 452 for input file', () => {
        const data = readFileIntoStringArray('./src/08/input.txt');
        expect(count1478InOutput(data)).toEqual(452);
    });
});

describe('8b', () => {
    it('calculateSumOfOutputs should return 8394 for [be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe]', () => {
        expect(calculateSumOfOutputs(['be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe'])).toEqual(8394);
    });
    it('calculateSumOfOutputs should return 61229 for sample input', () => {
        const input = [
            'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
            'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
            'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
            'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
            'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
            'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
            'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
            'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
            'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
            'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
        ]
        expect(calculateSumOfOutputs(input)).toEqual(61229);
    });
    it('calculateSumOfOuputs should return 1096964 for input file', () => {
        const data = readFileIntoStringArray('./src/08/input.txt');
        expect(calculateSumOfOutputs(data)).toEqual(1096964);
    });
})