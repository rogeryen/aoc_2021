export const createGrid = (points: number[][]): boolean[][] => {
    const grid: boolean[][] = [];
    let maxX = 0;
    let maxY = 0;
    for (const point of points) {
        maxX = point[0] > maxX ? point[0] : maxX;
        maxY = point[1] > maxY ? point[1] : maxY;
    }
    for (let y = 0; y <= maxY; y++) {
        const row: boolean[] = [];
        for (let x = 0; x <= maxX; x++) {
            row.push(false);
        }
        grid.push(row);
    }
    for (const point of points) {
        grid[point[1]][point[0]] = true;
    }
    return grid;
};

export const parsePointsAndFolds = (lines: string[]): { points: number[][], folds: number[][] } => {
    let parsePoints = true;
    const points: number[][] = [];
    const folds: number[][] = [];
    for (const line of lines) {
        if (line.length === 0 || !line) {
            parsePoints = false;
            continue;
        }
        if (parsePoints) {
            points.push(line.split(',').map((val) => parseInt(val)));
        } else {
            const axis = line.split(' ')[2].split('=');
            if (axis[0] === 'x') {
                folds.push([parseInt(axis[1]), 0]);
            } else {
                folds.push([0, parseInt(axis[1])]);
            }
        }
    }
    return { points: points, folds: folds };
};

export const foldGrid = (grid: boolean[][], fold: number[]): boolean[][] => {
    let gridOne: boolean[][] = [];
    let gridTwo: boolean[][] = [];
    if (fold[0]) {
        // fold on x axis
        for (const row of grid) {
            const left = row.slice(0, fold[0]);
            gridOne.push(left);
            const right = row.slice(fold[0] + 1);
            gridTwo.push(right);
        }
        // flip the right grid horizontally
        for (let i = 0; i < gridTwo.length; i++) {
            for (let j = 0; j < Math.round(gridTwo[0].length / 2); j++) {
                [gridTwo[i][j], gridTwo[i][gridTwo[i].length - 1 - j]] = [gridTwo[i][gridTwo[i].length - 1 - j], gridTwo[i][j]];
            }
        }
    } else {
        // fold on y axis
        gridOne = grid.slice(0, fold[1]);
        gridTwo = grid.slice(fold[1] + 1)
        // flip the bottom grid vertically
        for (let i = 0; i < Math.round(gridTwo.length / 2); i++) {
            [gridTwo[i], gridTwo[gridTwo.length - 1 - i]] = [gridTwo[gridTwo.length - 1 - i], gridTwo[i]];
        }
    }
    let largerGrid = gridOne;
    let smallerGrid = gridTwo;
    if (gridOne.length !== gridTwo.length) {
        // different number of rows
        if (gridOne.length > gridTwo.length) {

        } else {
            largerGrid = gridTwo;
            smallerGrid = gridOne;
        }
    } else {
        // different number of columns
        if (gridOne[0].length > gridTwo[0].length) {

        } else {
            largerGrid = gridTwo;
            smallerGrid = gridOne;
        }
    }

    for (let i = 0; i < smallerGrid.length; i++) {
        for (let j = 0; j < smallerGrid[0].length; j++) {
            largerGrid[i][j] = largerGrid[i][j] || smallerGrid[i][j];
        }
    }

    // merge and return
    return largerGrid;
};

export const numberOfPointsAfterFirstFold = (lines: string[]): number => {
    const pointsAndFolds = parsePointsAndFolds(lines);
    const grid = createGrid(pointsAndFolds.points);
    const firstFold = pointsAndFolds.folds[0];
    const newGrid = foldGrid(grid, firstFold);
    // count trues
    let count = 0;
    for (const row of newGrid) {
        for (const col of row) {
            if (col) {
                count++;
            }
        }
    }
    return count;
}