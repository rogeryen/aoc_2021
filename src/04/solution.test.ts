import { parsePicksAndBoards, markNumber, checkSolution, unmarkedSum, bingo, bingoLast } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('4a', () => {
    const data = [
        '1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21',
        ' ',
        ' 1  2  3  4  5',
        ' 6  7  8  9 10',
        '11 12 13 14 15',
        '16 17 18 19 20',
        '21 22 23 24 25',
        ' ',
        ' 9  7  5  3  1',
        '11 13 15 17 19',
        '99 97 95 93 91',
        '89 87 85 83 81',
        '21 22 23 24 25',
    ]

    it('parsePicksAndBoards will return an array of numbers and an array of maps containing value to positions', () => {
        const {picks, boards} = parsePicksAndBoards(data);
        expect(picks).toEqual(['1', '2', '3', '4', '6', '7', '8', '9', '11', '12', '13', '14', '16', '17', '18', '19', '21']);
        expect(boards.length).toEqual(2);
        expect(boards[0][0][0]).toEqual('1');
        expect(boards[0][4][4]).toEqual('25');
        expect(boards[1][0][4]).toEqual('1');
        expect(boards[1][4][4]).toEqual('25');
    });

    it('markNumber will change the position of number to -1 if it exists on board', () => {
        const {boards} = parsePicksAndBoards(data);
        markNumber(boards, '14');
        expect(boards[0][2][3]).toEqual('-1');
    });

    it('checkSolution will return true if a line of numbers are found in marked set', () => {
        const {boards} = parsePicksAndBoards(data);
        // horizontal line
        markNumber(boards, '1');
        markNumber(boards, '2');
        markNumber(boards, '3');
        markNumber(boards, '4');
        expect(checkSolution(boards[0])).toEqual(false);
        markNumber(boards, '5');
        expect(checkSolution(boards[0])).toEqual(true);

        // vertical line
        markNumber(boards, '9');
        markNumber(boards, '11');
        markNumber(boards, '99');
        markNumber(boards, '21');
        expect(checkSolution(boards[1])).toEqual(false);
        markNumber(boards, '89');
        expect(checkSolution(boards[1])).toEqual(true);
    });

    it('unmarkedSum will return sum of all elements of a two dimensional array minus a set', () => {
        const board = [
            ['1', '2', '3', '4', '5'],
            ['-1',  '-1', '-1', '-1', '-1']
        ];

        expect(unmarkedSum(board)).toEqual(1+2+3+4+5);
    });

    it('bingo will return 3024 from test input', () => {
        expect(bingo(data)).toEqual(3024);
    })

    it('bingo will return 11536 from input file', () => {
        const data = readFileIntoStringArray('./src/04/input.txt');
        expect(bingo(data)).toEqual(11536);
    })
});

describe('4b', () => {
    const data = [
        '1,2,3,4,5,30,31,32,33,25,26,27,28,20,21,22,23,34',
        ' ',
        ' 1  2  3  4  5',
        ' 6  7  8  9 10',
        '11 12 13 14 15',
        '16 17 18 19 20',
        '21 22 23 24 25',
        ' ',
        ' 1  2  3  4  6',
        '11 12 13 14 15',
        '20 21 22 23 24',
        '25 26 27 28 29',
        '30 31 32 33 34',
    ];

    it('bingoLast will return 4216 from the sample input', () => {
        expect(bingoLast(data)).toEqual(4216);
    })

    it('bingoLast will return 11536 from input file', () => {
        const data = readFileIntoStringArray('./src/04/input.txt');
        expect(bingoLast(data)).toEqual(1284);
    })
});