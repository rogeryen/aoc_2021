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
