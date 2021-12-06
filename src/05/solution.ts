interface ILine {
    p1: IPoint,
    p2: IPoint,
};

interface IPoint {
    x: number,
    y: number,
}

export const parseLine = (line: string): ILine => {
    const points = line.split('->');
    const p1 = points[0].trim().split(',');
    const p2 = points[1].trim().split(',');
    return {
        p1: {x: parseInt(p1[0]), y: parseInt(p1[1])},
        p2: {x: parseInt(p2[0]), y: parseInt(p2[1])}
    };
};

export const isHorizontalOrVertical = (line: ILine) => {
    return line.p1.x === line.p2.x || line.p1.y === line.p2.y;
};

export const getLinePoints = (line: ILine) => {
    const points: IPoint[] = [];
    if (line.p1.x === line.p2.x) {
        const smallerY = line.p1.y < line.p2.y ? line.p1.y : line.p2.y;
        for (let i = smallerY; i <= smallerY + Math.abs(line.p1.y - line.p2.y); i++) {
            points.push({x: line.p1.x, y: i});
        } 
    } else if (line.p1.y === line.p2.y) {
        const smallerX = line.p1.x < line.p2.x ? line.p1.x: line.p2.x;
        for (let i = smallerX; i <= smallerX + Math.abs(line.p1.x - line.p2.x); i++) {
            points.push({x: i, y: line.p1.y});
        } 
    } else {
        points.push(line.p1);
        let x = line.p1.x;
        let y = line.p1.y;
        while (x !== line.p2.x && y !== line.p2.y) {
            x = x < line.p2.x ? x+1 : x-1;
            y = y < line.p2.y ? y+1 : y-1;
            points.push({x: x, y: y});
        }
    }
    return points;
};

export const countIntersectPoints = (data: string[], verticalAndHorizontalOnly = true): number => {
    const lines: ILine[] = [];
    for (const d of data) {
        lines.push(parseLine(d));
    }
    const grid: Record<string, number> = {};
    let count = 0;

    for (const line of lines) {
        if (verticalAndHorizontalOnly && !isHorizontalOrVertical(line)) {
            continue;
        }

        const points = getLinePoints(line);
        for (const point of points) {
            if (!grid[`${point.x},${point.y}`]) {
                grid[`${point.x},${point.y}`] = 1;
            } else {
                grid[`${point.x},${point.y}`]++;
            }
        }
    }

    for (const key in grid) {
        if (grid[key] > 1) {
            count++;
        }
    }
    return count;
};