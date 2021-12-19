import { createGrid, parsePointsAndFolds, numberOfPointsAfterFirstFold, gridAfterFolds } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('13a', () => {
    it('createGrid with 1,2 2,3 3,3 should create a 4x4 two dimensional array with [2][1], [3][2], [3][3]', () => {
        const points = [
            [1, 2],
            [2, 3],
            [3, 3],
        ]
        const grid = createGrid(points);
        expect(grid.length).toEqual(4);
        expect(grid[0].length).toEqual(4);
        expect(grid[0][0]).toEqual(false);
        expect(grid[2][1]).toEqual(true);
        expect(grid[3][2]).toEqual(true);
        expect(grid[3][3]).toEqual(true);
        expect(grid[3][0]).toEqual(false);
    });

    it('parsePointsAndFolds with sample input should return object with points of array length 18 and folds of array length 2', () => {
        const lines = [
            '6,10',
            '0,14',
            '9,10',
            '0,3',
            '10,4',
            '4,11',
            '6,0',
            '6,12',
            '4,1',
            '0,13',
            '10,12',
            '3,4',
            '3,0',
            '8,4',
            '1,10',
            '2,14',
            '8,10',
            '9,0',
            '',
            'fold along y=7',
            'fold along x=5',
        ]

        const pointsAndFolds = parsePointsAndFolds(lines);
        expect(pointsAndFolds.points.length).toEqual(18);
        expect(pointsAndFolds.folds.length).toEqual(2);
    });

    it('numberOfPointsAfterFirstFold with sample input should return 17', () => {
        const lines = [
            '6,10',
            '0,14',
            '9,10',
            '0,3',
            '10,4',
            '4,11',
            '6,0',
            '6,12',
            '4,1',
            '0,13',
            '10,12',
            '3,4',
            '3,0',
            '8,4',
            '1,10',
            '2,14',
            '8,10',
            '9,0',
            '',
            'fold along y=7',
            'fold along x=5',
        ];
        expect(numberOfPointsAfterFirstFold(lines)).toEqual(17);
    });

    it('numberOfPointsAfterFirstFold with input file should return 704', () => {
        const data = readFileIntoStringArray('./src/13/input.txt');
        expect(numberOfPointsAfterFirstFold(data)).toEqual(704);
    });
});

describe('13b', () => {
    it('gridAfterFolds with input file should return two dimensional with 8 capital letters and a vertical empty(false) line after each letter', () => {
        const data = readFileIntoStringArray('./src/13/input.txt');
        const grid = gridAfterFolds(data);
        // let str = ''
        // for (const row of grid) {
        //     str += row.map((v) => v ? '1' : ' ').join('') + '\n'
        // }
        // console.log(str)
        let emptyCol = -1;
        for (let i = 0; i < 8; i++) {
            emptyCol += 5;
            expect(grid[0][emptyCol]).toEqual(false);
            expect(grid[1][emptyCol]).toEqual(false);
            expect(grid[2][emptyCol]).toEqual(false);
            expect(grid[3][emptyCol]).toEqual(false);
            expect(grid[4][emptyCol]).toEqual(false);
            expect(grid[5][emptyCol]).toEqual(false);
        }
    });
})