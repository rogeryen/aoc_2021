export const decodeEasySignal = (signal: string): number => {
    let decoded = -1;
    switch (signal.length) {
    case 2:
        decoded = 1;
        break;
    case 3:
        decoded = 7;
        break;
    case 4: 
        decoded = 4;
        break;
    case 7:
        decoded = 8;
        break; 
    }
    return decoded;
}

export const count1478InOutput = (data: string[]): number => {
    let c = 0;
    for (const line of data) {
        const parts = line.split('|');
        const signals = parts[1].trim().split(' ');
        for (const signal of signals) {
            const decoded = decodeEasySignal(signal);
            if (decoded === 1 || decoded === 4 || decoded === 7 || decoded === 8) {
                c++;
            }
        }
    }
    return c;
}

/**
 * rules
 length 2 - 1
 length 3 - 7
 length 4 - 4
 length 5
 - contains 1's elements - 3
 - contains 4's elements minus 1's elements - 5
 - rest - 2
 length 6
 - contains 4's elements - 9
 - contains 7's elements - 0
 - rest - 6
 length 7 - 8
 */
export const getNumbersMap = (patterns: string[]): Record<string, string> => {
    const numbersMap: Record<string, string> = {};
    for (const pattern of patterns) {
        if (pattern.length === 2) {
            numbersMap['1'] = sortString(pattern);
        } else if (pattern.length === 3) {
            numbersMap['7'] = sortString(pattern);
        } else if (pattern.length === 4) {
            numbersMap['4'] = sortString(pattern);
        } else if (pattern.length === 7) {
            numbersMap['8'] = sortString(pattern);
        } 
    }
    const oneArray = numbersMap['1'].split('')
    const fourSet = new Set<string>(numbersMap['4'].split(''));
    const fourArray = [...fourSet];
    const oneSet = new Set<string>(oneArray);
    const fourMinusOne = new Set(fourSet);
    for (const ele of oneSet) {
        fourMinusOne.delete(ele);
    }
    const fourMinusOneArray = [...fourMinusOne];
    const sevenArray = numbersMap['7'].split('')

    for (const pattern of patterns) {
        const set = new Set<string>(pattern.split(''));
        if (pattern.length === 5) {
            if (set.has(oneArray[0]) && set.has(oneArray[1])) {
                numbersMap['3'] = sortString(pattern);
            } else if (set.has(fourMinusOneArray[0]) && set.has(fourMinusOneArray[1])) {
                numbersMap['5'] = sortString(pattern);
            } else {
                numbersMap['2'] = sortString(pattern);
            }
        } else if (pattern.length === 6) {
            if (set.has(fourArray[0]) && set.has(fourArray[1]) && set.has(fourArray[2]) && set.has(fourArray[3])) {
                numbersMap['9'] = sortString(pattern);
            } else if (set.has(sevenArray[0]) && set.has(sevenArray[1]) && set.has(sevenArray[2])) {
                numbersMap['0'] = sortString(pattern);
            } else {
                numbersMap['6'] = sortString(pattern);
            }
        }
    }

    return numbersMap;
}

const sortString = (str: string): string => {
    return str.split('').sort().join('');
}

export const calculateSumOfOutputs = (data: string[]): number => {
    let sum = 0;
    for (const line of data) {
        const parts = line.split('|');
        const patterns = parts[0].trim().split(' ');
        const output = parts[1].trim().split(' ');
        const numbersMap = getNumbersMap(patterns);
        
        const patternToNumber: Record<string, string> = {};
        Object.keys(numbersMap).forEach((k) => {
            patternToNumber[numbersMap[k]] = k;
        });

        const value: string[] = [];
        for (let pattern of output) {
            pattern = pattern.split('').sort().join('');
            value.push(patternToNumber[pattern]);
        }
        sum += parseInt(value.join(''));
    }
    return sum;
}