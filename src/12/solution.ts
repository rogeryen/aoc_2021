class Node {
    paths: Node[];
    name: string;
    bigCave = false;

    constructor(name: string) {
        this.name = name;
        this.paths = [];
        if (this.name === this.name.toUpperCase()) {
            this.bigCave = true;
        }
    }
}

export const findPaths = (data: string[], visitOneSmallCaveTwice = false): string[] => {
    // create graph
    const nodesMap: { [key: string]: Node } = {};

    for (const line of data) {
        const pathNodes = line.split('-');
        if (!nodesMap[pathNodes[0]]) {
            const node = new Node(pathNodes[0]);
            nodesMap[pathNodes[0]] = node;
        }
        if (!nodesMap[pathNodes[1]]) {
            const node = new Node(pathNodes[1]);
            nodesMap[pathNodes[1]] = node;
        }
        nodesMap[pathNodes[0]].paths.push(nodesMap[pathNodes[1]]);
        nodesMap[pathNodes[1]].paths.push(nodesMap[pathNodes[0]]);
    }

    let paths: string[][] = []
    if (visitOneSmallCaveTwice) {
        for (const node in nodesMap) {
            if (!nodesMap[node].bigCave && node !== 'start' && node !== 'end') {
                const nodeVisitStats: { [key: string]: number } = {};
                Object.keys(nodesMap).forEach((key) => {
                    nodeVisitStats[key] = 0;
                })

                paths = paths.concat(walkToEnd(nodesMap, nodeVisitStats, nodesMap['start'], node));
            }
        }
    } else {
        const nodeVisitStats: { [key: string]: number } = {};
        Object.keys(nodesMap).forEach((key) => {
            nodeVisitStats[key] = 0;
        })

        paths = paths.concat(walkToEnd(nodesMap, nodeVisitStats, nodesMap['start'], ''));
    }
    const uniqueStringPaths = [...new Set(paths.map((path) => path.join(',')))];
    return uniqueStringPaths;
}

const walkToEnd = (nodesMap: { [key: string]: Node }, nodeVisitStats: { [key: string]: number }, node: Node, nodeToVisitTwice?: string): string[][] => {
    // success condition
    if (node.name === 'end') {
        return [['end']];
    }
    // backtrack
    if (nodeToVisitTwice) {
        if ((!node.bigCave && node.name !== nodeToVisitTwice && nodeVisitStats[node.name] > 0) || (!node.bigCave && node.name === nodeToVisitTwice && nodeVisitStats[node.name] > 1)) {
            return [[]];
        }
    } else {
        if (!node.bigCave && nodeVisitStats[node.name] > 0) {
            return [[]];
        }
    }

    nodeVisitStats[node.name]++;
    const paths = [];
    for (const pathNode of node.paths) {
        const nodeVisitStatsCopy = { ...nodeVisitStats };
        const subPaths = walkToEnd(nodesMap, nodeVisitStatsCopy, pathNode, nodeToVisitTwice);
        for (const subPath of subPaths) {
            // only count branches that end properly
            if (subPath[subPath.length - 1] === 'end') {
                paths.push([node.name].concat(subPath));
            }
        }

    }
    return paths;
}