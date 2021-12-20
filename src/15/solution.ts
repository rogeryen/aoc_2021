var dijkstra = require('dijkstrajs');


export const lowestCostPath = (data: string[]): number => {
    const grid: number[][] = [];
    for (const line of data) {
        grid.push(line.split('').map((v) => parseInt(v)));
    }
    const graph: { [key: string]: any } = {};
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
    const result: string[] = dijkstra.find_path(graph, [0, 0].join(','), [grid.length - 1, grid[0].length - 1].join(','))
    let cost = 0;
    for (let i = 1; i < result.length; i++) {
        const pos = result[i].split(',').map((v) => parseInt(v))
        cost += grid[pos[0]][pos[1]]
    }
    return cost;
}