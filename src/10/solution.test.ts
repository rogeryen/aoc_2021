import { validate, getTotalErrorScore, getTotalIncompleteScore } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('10a', () => {
    it('validate should return 0 for valid and complete line', () => {
        expect(validate('[<>{{}(<>)}]')).toEqual(0);
    });
    it('validate should return 3 for corrupt line with )', () => {
        expect(validate('[[<[([]))<([[{}[[()]]]')).toEqual(3);
    });
    it('validate should return 57 for corrupt line with ]', () => {
        expect(validate('[{[{({}]{}}([{[{{{}}([]')).toEqual(57);
    });
    it('validate should return 1197 for corrupt line with }', () => {
        expect(validate('{([(<{}[<>[]}>{[]{[(<()>')).toEqual(1197);
    });
    it('validate should return 25137 for corrupt line with >', () => {
        expect(validate('<{([([[(<>()){}]>(<<{{')).toEqual(25137);
    });
    it('validate should return negative score for incomplete line', () => {
        expect(validate('[<>{{}(<>)}')).toBeLessThan(0);
    });
    it('getTotalErrorScore should return 392097 for sample input', () => {
        expect(getTotalErrorScore([
            '[({(<(())[]>[[{[]{<()<>>',
            '[(()[<>])]({[<{<<[]>>(',
            '{([(<{}[<>[]}>{[]{[(<()>',
            '(((({<>}<{<{<>}{[]{[]{}',
            '[[<[([]))<([[{}[[()]]]',
            '[{[{({}]{}}([{[{{{}}([]',
            '{<[[]]>}<{[{[{[]{()[[[]',
            '[<(<(<(<{}))><([]([]()',
            '<{([([[(<>()){}]>(<<{{',
            '<{([{{}}[<[[[<>{}]]]>[]]'
        ])).toEqual(26397);
    });
    it('getTotalErrorScore should return 392097 for input file', () => {
        const lines = readFileIntoStringArray('./src/10/input.txt');
        expect(getTotalErrorScore(lines)).toEqual(392097);
    });
});

describe('10b', () => {
    it('getTotalIncompleteScore should return 288957 for the sample input', () => {
        expect(getTotalIncompleteScore([
            '[({(<(())[]>[[{[]{<()<>>',
            '[(()[<>])]({[<{<<[]>>(',
            '{([(<{}[<>[]}>{[]{[(<()>',
            '(((({<>}<{<{<>}{[]{[]{}',
            '[[<[([]))<([[{}[[()]]]',
            '[{[{({}]{}}([{[{{{}}([]',
            '{<[[]]>}<{[{[{[]{()[[[]',
            '[<(<(<(<{}))><([]([]()',
            '<{([([[(<>()){}]>(<<{{',
            '<{([{{}}[<[[[<>{}]]]>[]]'
        ])).toEqual(288957);
    });
    it('getTotalIncompleteScore should return x for input file', () => {
        const lines = readFileIntoStringArray('./src/10/input.txt');
        expect(getTotalIncompleteScore(lines)).toEqual(4263222782);
    });

})
