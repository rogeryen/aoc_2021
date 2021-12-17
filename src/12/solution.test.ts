import { findPaths } from './solution';
import { readFileIntoStringArray } from '../utils/files';

describe('12a', () => {
    it('findPaths should return array of 10 for the small sample input', () => {
        const data = [
            'start-A',
            'start-b',
            'A-c',
            'A-b',
            'b-d',
            'A-end',
            'b-end',
        ]
        expect(findPaths(data).length).toEqual(10);
    });

    it('findPaths should return array of 19 for the medium sample input', () => {
        const data = [
            'dc-end',
            'HN-start',
            'start-kj',
            'dc-start',
            'dc-HN',
            'LN-dc',
            'HN-end',
            'kj-sa',
            'kj-HN',
            'kj-dc',
        ]
        expect(findPaths(data).length).toEqual(19);
    });

    it('findPaths should return array of 226 for the large sample input', () => {
        const data = [
            'fs-end',
            'he-DX',
            'fs-he',
            'start-DX',
            'pj-DX',
            'end-zg',
            'zg-sl',
            'zg-pj',
            'pj-he',
            'RW-he',
            'fs-DX',
            'pj-RW',
            'zg-RW',
            'start-pj',
            'he-WI',
            'zg-he',
            'pj-fs',
            'start-RW',
        ]
        expect(findPaths(data).length).toEqual(226);
    });

    it('findPaths should return array of x for input file', () => {
        const data = readFileIntoStringArray('./src/12/input.txt');
        expect(findPaths(data).length).toEqual(4167);
    });
})

