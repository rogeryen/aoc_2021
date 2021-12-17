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

export const findPaths = (data: string[]): string[] => {
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

    // dfs from 'start'
    // const paths: string[] = [];
    const nodeVisitStats: { [key: string]: number } = {};
    Object.keys(nodesMap).forEach((key) => {
        nodeVisitStats[key] = 0;
    })

    const paths = walkToEnd(nodesMap, nodeVisitStats, nodesMap['start']);
    return paths.map((path) => path.join(','));
}

const walkToEnd = (nodesMap: { [key: string]: Node }, nodeVisitStats: { [key: string]: number }, node: Node): string[][] => {
    // success condition
    if (node.name === 'end') {
        return [['end']];
    }
    // backtrack
    if ((!node.bigCave && nodeVisitStats[node.name] > 0)) {
        return [[]];
    }
    nodeVisitStats[node.name]++;
    const paths = [];
    for (const pathNode of node.paths) {
        const nodeVisitStatsCopy = { ...nodeVisitStats };
        const subPaths = walkToEnd(nodesMap, nodeVisitStatsCopy, pathNode);
        for (const subPath of subPaths) {
            // only count branches that end properly
            if (subPath[subPath.length - 1] === 'end') {
                paths.push([node.name].concat(subPath));
            }
        }

    }
    return paths;
}