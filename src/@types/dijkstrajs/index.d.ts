/// <reference types="node" />

declare module 'dijkstrajs' {
    function find_path(graph: { [key: string]: { [key: string]: number } }, s: string, d: string): string[];
}

