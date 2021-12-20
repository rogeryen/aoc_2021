import * as dijkstra from 'dijkstrajs';

const createGraph = (originalGrid: number[][], multiplier = 0): { graph: { [key: string]: { [key: string]: number } }, newGrid: number[][] } => {
    let grid: number[][] = [];
    if (multiplier > 0) {
        for (const row of originalGrid) {
            const newRow: number[] = [];
            for (let i = 0; i < multiplier; i++) {
                for (const col of row) {
                    const newCol = (col + i) > 9 ? ((col + i) % 10) + 1 : col + i;
                    newRow.push(newCol);
                }
            }
            grid.push(newRow);
        }
        const rowSize = grid.length;
        for (let i = 1; i < multiplier; i++) {
            for (let row = 0; row < rowSize; row++) {
                const newRow: number[] = [];
                for (const col of grid[row]) {
                    const newCol = (col + i) > 9 ? ((col + i) % 10) + 1 : col + i;
                    newRow.push(newCol);
                }
                grid.push(newRow);
            }
        }
    } else {
        grid = originalGrid;
    }

    const graph: { [key: string]: { [key: string]: number } } = {};
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const key = `${row},${col}`;
            graph[key] = {};
            if (grid[row - 1] && grid[row - 1][col]) {
                graph[key][`${row - 1},${col}`] = grid[row - 1][col];
            }
            if (grid[row][col + 1]) {
                graph[key][`${row},${col + 1}`] = grid[row][col + 1];
            }
            if (grid[row + 1] && grid[row + 1][col]) {
                graph[key][`${row + 1},${col}`] = grid[row + 1][col];
            }
            if (grid[row][col - 1]) {
                graph[key][`${row},${col - 1}`] = grid[row][col - 1];
            }
        }
    }
    return {
        graph: graph,
        newGrid: grid
    };
}
export const lowestCostPath = (data: string[], multiplier = 0): number => {
    const grid: number[][] = [];
    for (const line of data) {
        grid.push(line.split('').map((v) => parseInt(v)));
    }
    const { graph, newGrid } = createGraph(grid, multiplier);

    const result: string[] = dijkstra.find_path(graph, [0, 0].join(','), [newGrid.length - 1, newGrid[0].length - 1].join(','))
    let cost = 0;
    for (let i = 1; i < result.length; i++) {
        const pos = result[i].split(',').map((v) => parseInt(v))
        cost += newGrid[pos[0]][pos[1]]
    }
    return cost;
}