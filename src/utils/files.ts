import fs = require('fs');

export const readFileIntoStringArray = (fileName: string): string[] => {
    return fs.readFileSync(fileName).toString().split('\n');
}

export const readFileIntoNumberArray = (fileName: string): number[] => {
    return readFileIntoStringArray(fileName).map((val) => parseInt(val));
}

export const readLineIntoNumberArray = (fileName: string, delimiter: string): number[] => {
    return readFileIntoStringArray(fileName)[0].split(delimiter).map(n => parseInt(n));
};