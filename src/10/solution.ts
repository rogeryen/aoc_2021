export const validate = (line: string): number => {
    // key to this type of question is to use a stack to keep track of characters seen
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        const c = line.charAt(i);
        if (['(', '[', '{', '<'].includes(c)) {
            stack.push(line.charAt(i));
        } else {
            const closing = stack.pop();
            if (c === ')' && closing !== '(') {
                return 3;
            }
            if (c === ']' && closing !== '[') {
                return 57;
            }
            if (c === '}' && closing !== '{') {
                return 1197;
            }
            if (c === '>' && closing !== '<') {
                return 25137;
            }
        }
    }

    if (stack.length > 0) {
        let sum = 0;
        while (stack.length > 0) {
            const c = stack.pop();
            let score = 0;
            switch (c) {
            case '(':
                score = 1;
                break;
            case '[':
                score = 2;
                break;
            case '{':
                score = 3;
                break;
            case '<':
                score = 4;
                break;
            }
            sum = sum * 5 + score;

        }
        return -sum;
    }

    return 0;
}

export const getTotalErrorScore = (lines: string[]): number => {
    let sum = 0;
    for (const line of lines) {
        const score = validate(line);
        if (score > 0) {
            sum += score;
        }
    }
    return sum;
}

export const getTotalIncompleteScore = (lines: string[]): number => {
    const scores = [];
    for (const line of lines) {
        const score = validate(line);
        if (score < 0) {
            scores.push(-score);
        }
    }
    return scores.sort((a, b) => a - b)[Math.round(scores.length / 2) - 1];
}
