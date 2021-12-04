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

export const calculatePowerConsumption = (binaries: string[]):number => {
    const gammaBinary = determineGammaRate(binaries);
    const episilonBinary = gammaBinary.split('').map((bit) => bit === '0' ? '1' : '0').join('');
    return parseInt(gammaBinary, 2) * parseInt(episilonBinary, 2) + 0;
}