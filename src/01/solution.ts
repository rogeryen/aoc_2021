import fs = require('fs');
import path = require('path');

export const countIncreases = (depths: number[]) => {
    let increases = 0;

    for (let i = 0; i < depths.length; i++) {
        if (i > 0 && depths[i] > depths[i - 1]) {
            increases++;
        }
    }
    return increases;
}
