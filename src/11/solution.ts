export const simulateSteps = (data: number[][], num: number): number => {
    let flashes = 0;
    for (let step = 0; step < num; step++) {
        // reset energy > 9 to 0 on beginning of each step
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                if (data[row][col] > 9) {
                    data[row][col] = 0;
                }
            }
        }
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                flashes += gainEnergy(data, row, col);
            }
        }
    }
    return flashes;
}

const gainEnergy = (data: number[][], row: number, col: number): number => {
    let flashes = 0;
    if (data[row] === undefined || data[row][col] === undefined || data[row][col] > 9 ) {
        return 0;
    }

    data[row][col]++;
    if (data[row][col] > 9) {
        flashes += 1;
        flashes += gainEnergy(data, row - 1, col - 1);
        flashes += gainEnergy(data, row - 1, col);
        flashes += gainEnergy(data, row - 1, col + 1);
        flashes += gainEnergy(data, row, col - 1);
        flashes += gainEnergy(data, row, col);
        flashes += gainEnergy(data, row, col + 1);
        flashes += gainEnergy(data, row + 1, col - 1);
        flashes += gainEnergy(data, row + 1, col);
        flashes += gainEnergy(data, row + 1, col + 1);
    }
    return flashes;
}

export const simulateUntilFirstSynchronizedFlash = (data: number[][]): number => {
    let step = 1;
    while (simulateSteps(data, 1) !== data.length * data[0].length) {
        step += 1;
    }
    return step;
}