export const parsePicksAndBoards = (data: string[]) => {
    const picks: string[] = data[0].split(',');
    const boards = [];
    let count = 0;
    let board: string[][] = [];
    for (let i = 2; i < data.length; i++) {
        if (data[i].trim() === '') {
            count = 0;
            continue;
        }
        const row = data[i].trim().split(/\s+/);
        board.push(row);
        count++;
        if (count === 5) {
            boards.push(board);
            board = [];
        }
    }
  
    return {picks, boards};
};

export const markNumber = (boards: string[][][], number: string) => {
    for (let i = 0; i < boards.length; i++) {
        for (let row = 0; row < boards[i].length; row++) {
            for (let column = 0; column < boards[i][row].length; column++) {
                if (boards[i][row][column] === number) {
                    boards[i][row][column] = '-1';
                }
            }
        }
    }
};

export const checkSolution = (board: string[][]) => {
    // horizontal
    for (const row of board) {
        if (JSON.stringify(row) == JSON.stringify(['-1', '-1', '-1', '-1', '-1'])) {
            return true;
        }
    }

    // vertical
    for (let col = 0; col < board[0].length; col++) {
        const columnValues = [];
        for (let row = 0; row < board.length; row++) {
            columnValues.push(board[row][col]);
        }
        if (JSON.stringify(columnValues) === JSON.stringify(['-1', '-1', '-1', '-1', '-1'])) {
            return true;
        }
    }
    return false;
}

export const unmarkedSum = (board: string[][]): number => {
    const numbers: string[] = [];
    for (const row of board) {
        numbers.push(...row);
    }
    const unmarked = numbers.filter((val) => val !== '-1').map((val) => parseInt(val));
    return unmarked.reduce((sum, curr) => sum + curr, 0);
}

export const bingo = (data: string[]): number => {
    const { picks, boards } = parsePicksAndBoards(data);
    for (const num of picks) {
        markNumber(boards, num);
        for (let i = 0; i < boards.length; i++) {
            if (checkSolution(boards[i])) {
                return unmarkedSum(boards[i]) * parseInt(num);
            }
        }
    }
    return 0;
}

export const bingoLast = (data: string[]): number => {
    let { picks, boards } = parsePicksAndBoards(data);
    let score = 0;
    for (const num of picks) {
        markNumber(boards, num);
        let winners = new Set<number>();
        for (let i = 0; i < boards.length; i++) {
            if (checkSolution(boards[i])) {
                score = unmarkedSum(boards[i]) * parseInt(num);
                winners.add(i);
            }
        }
        boards = boards.filter((val, index) => !winners.has(index));
    }
    return score;
}
