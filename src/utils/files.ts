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

export const readFileIntoNumberArrays = (fileName: string): number[][] => {
    const numberArrays: number[][] = [];
    const data = readFileIntoStringArray(fileName);
    for (const line of data) {
        numberArrays.push(line.split('').map(n => parseInt(n)));
    }
    return numberArrays;
}
