export const decrement = (fish: number): { fish: number, newFish: number | undefined } => {
    if (fish === 0) {
        return { fish: 6, newFish: 8 };
    }
    return { fish: --fish, newFish: undefined };
};

export const simulate = (fishs: number[], days: number): number[] => {
    for (let i = 0; i < days; i++) {
        const newFishs: number[] = [];
        fishs.forEach((element, index) => {
            const { fish, newFish } = decrement(element);
            fishs[index] = fish;
            if (newFish) {
                newFishs.push(newFish);
            }
        });
        fishs = fishs.concat(newFishs);
    }
    return fishs;
};

export const simulateSum256 = (fishs: number[]): number => {
    const fiftySixTimes = [
        simulate([0], 176).length,
        simulate([1], 176).length,
        simulate([2], 176).length,
        simulate([3], 176).length,
        simulate([4], 176).length,
        simulate([5], 176).length,
        simulate([6], 176).length,
        simulate([7], 176).length,
        simulate([8], 176).length,
    ]
    const numbersAt80 = simulate(fishs, 80);
    let sum = 0;
    numbersAt80.forEach(val => sum += fiftySixTimes[val])
    return sum;
};
