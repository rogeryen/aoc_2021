export const getLowpoints = (heightMap: number[][]): number[] => {
    const lowpoints: number[] = [];
    for (let row = 0; row < heightMap.length; row++) {
        for (let column = 0; column < heightMap[row].length; column++) {
            const height = heightMap[row][column];
            if (heightMap[row - 1] !== undefined && height >= heightMap[row - 1][column]) {
                continue;
            }
            if (heightMap[row][column - 1] !== undefined && height >= heightMap[row][column - 1]) {
                continue;
            }
            if (heightMap[row + 1] !== undefined && height >= heightMap[row + 1][column]) {
                continue;
            }
            if (heightMap[row][column + 1] !== undefined && height >= heightMap[row][column + 1]) {
                continue;
            }
            lowpoints.push(height);
        }
    }
    return lowpoints;
};

export const calculateRiskLevel = (heightMap: number[][]): number => {
    const lowpoints = getLowpoints(heightMap);
    const riskLevel = lowpoints.reduce((sum, curr) => sum + curr + 1, 0);
    return riskLevel;
}

export const findBasin = (heightMap: number[][], row: number, col: number): number[] => {
    if (heightMap[row] === undefined || heightMap[row][col] === undefined || heightMap[row][col] === 9) {
        return [];
    }
    let basin = [heightMap[row][col]];
    heightMap[row][col] = 9;
    basin = basin.concat(findBasin(heightMap, row, col + 1));
    basin = basin.concat(findBasin(heightMap, row + 1, col));
    basin = basin.concat(findBasin(heightMap, row, col - 1));
    basin = basin.concat(findBasin(heightMap, row - 1, col));
    return basin;
}

export const productOfLargestThreeBasins = (heightMap: number[][]): number => {
    const basinSizes: number[] = [];
    for (let row = 0; row < heightMap.length; row++) {
        for (let col = 0; col < heightMap[row].length; col++) {
            const basin = findBasin(heightMap, row, col);
            if (basin.length > 0) {
                basinSizes.push(basin.length);
            }
        }
    }

    basinSizes.sort((a, b) => b - a);
    return basinSizes[0] * basinSizes[1] * basinSizes[2];
}
