export const polymerize = (data: string[], times: number): { [key: string]: number } => {
    let template = data[0];
    const rules: { [key: string]: string } = {};
    for (let i = 2; i < data.length; i++) {
        const mapping = data[i].split(' -> ');
        rules[mapping[0]] = mapping[1];
    }
    for (let i = 0; i < times; i++) {
        const parts: string[] = [];
        for (let j = 1; j < template.length; j++) {
            parts.push(template.substring(j - 1, j + 1));
        }
        for (let j = 0; j < parts.length; j++) {
            if (rules[parts[j]]) {
                parts[j] = parts[j].slice(0, 1) + rules[parts[j]];
            }
        }
        template = parts.join('') + template.charAt(template.length - 1);
    }
    const counts: { [key: string]: number } = {};
    for (let i = 0; i < template.length; i++) {
        const char = template.charAt(i);
        if (counts[char] === undefined) {
            counts[char] = 1;
        } else {
            counts[char]++;
        }
    }
    return counts;
}

export const polymerizeV2 = (data: string[], times: number): { [key: string]: number } => {
    const template = data[0];
    const rules: { [key: string]: string } = {};
    for (let i = 2; i < data.length; i++) {
        const mapping = data[i].split(' -> ');
        rules[mapping[0]] = mapping[1];
    }

    // init pair count map
    let pairCount: { [key: string]: number } = {};
    for (let i = 1; i < template.length; i++) {
        pairCount[template.substring(i - 1, i + 1)] = 1;
    }

    // keep track of pair count from previous iteration
    for (let i = 0; i < times; i++) {
        const newPairCount: { [key: string]: number } = {};
        for (const pair in pairCount) {
            if (rules[pair]) {
                const pair1 = pair[0] + rules[pair];
                newPairCount[pair1] = (newPairCount[pair1] || 0) + (pairCount[pair] || 1);
                const pair2 = rules[pair] + pair[1];
                newPairCount[pair2] = (newPairCount[pair2] || 0) + (pairCount[pair] || 1);
            }
        }
        pairCount = newPairCount;
    }

    const charCount: { [key: string]: number } = {};
    for (const p in pairCount) {
        if (!charCount[p.charAt(0)]) {
            charCount[p.charAt(0)] = 0;
        }
        charCount[p.charAt(0)] += pairCount[p];
    }
    charCount[template[template.length - 1]]++;
    return charCount;
}

export const mostCommonMinusLeastCommon = (data: string[]): number => {
    const counts = polymerize(data, 10);
    const countArray = Object.values(counts).sort((a, b) => a - b);
    return countArray[countArray.length - 1] - countArray[0];
}

export const mostCommonMinusLeastCommonV2 = (data: string[]): number => {
    const counts = polymerizeV2(data, 40);
    const countArray = Object.values(counts).sort((a, b) => a - b);
    return countArray[countArray.length - 1] - countArray[0];
}