const determineGammaRate = (binaries: string[]):string => {
    if (binaries.length === 0) {
        return '0'
    }

    const bitSize = binaries[0].length;
    const gammaRate = [];

    for (let i = 0; i < bitSize; i++) {
        let count0 = 0;
        let count1 = 0;
        for (let j = 0; j < binaries.length; j++) {
            if (binaries[j].charAt(i) == '0') {
                count0++;
            } else {
                count1++;
            }
        }
        gammaRate.push(count1 > count0 ? 1 : 0);
    }

    return gammaRate.join('');
} 

export const calculatePowerConsumption = (binaries: string[]): number => {
    const gammaBinary = determineGammaRate(binaries);
    const episilonBinary = gammaBinary.split('').map((bit) => bit === '0' ? '1' : '0').join('');
    return parseInt(gammaBinary, 2) * parseInt(episilonBinary, 2) + 0;
}

export enum RatingType {
    Oxygen = 1,
    Co2,
}

export const findRating = (binaries: string[], rating: RatingType): string => {
    let oxygenRating = binaries[0];
    let candidates = binaries;

    for (let i = 0; i < candidates[0].length; i++) {
        if (candidates.length === 1) {
            break;
        }
        const ones : string[] = [];
        const zeroes: string[] = [];
        for (const candidate of candidates) {
            if (candidate.charAt(i) === '1') {
                ones.push(candidate);
            } else {
                zeroes.push(candidate);
            }
        }
        if (rating === RatingType.Oxygen) {
            candidates = ones.length >= zeroes.length ? ones : zeroes;
        } else {
            candidates = ones.length < zeroes.length ? ones : zeroes;
        }
        
        oxygenRating = candidates[0];
    }
    return oxygenRating;
}

export const calculateLifeSupportRating = (binaries: string[]): number => {
    const oxygenRating = parseInt(findRating(binaries, RatingType.Oxygen), 2);
    const co2Rating = parseInt(findRating(binaries, RatingType.Co2), 2);
    return oxygenRating * co2Rating + 0;
}