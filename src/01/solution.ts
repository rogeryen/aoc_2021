export const countIncreases = (depths: number[]): number => {
    let increases = 0;

    for (let i = 0; i < depths.length; i++) {
        if (i > 0 && depths[i] > depths[i - 1]) {
            increases++;
        }
    }
    return increases;
}

export const countIncreasesInThrees = (depths: number[]): number => {
    if (depths.length < 4) {
        return 0;
    }
    let increases = 0;

    for (let i = 3; i < depths.length; i++) {
        if (depths[i] > depths[i-3]) {
            increases++;
        }
    }
    return increases;
}