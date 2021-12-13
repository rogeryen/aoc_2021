export const calculateLeastFuelToAlign = (positions: number[], fuelCostModifier?: (num: number) => number): number => {
    let leastFuel = Number.MAX_SAFE_INTEGER;
    let anchor = -1;
    const pastFuelCost: Set<number> = new Set<number>();
    const uniqueAnchors: Set<number> = new Set<number>(positions);
    positions = positions.sort();
    for (const currentAnchor of positions) {
        if (pastFuelCost.has(currentAnchor)) {
            continue;
        }
        let fuel = 0;
        for (const position of positions) {
            let cost = Math.abs(position - currentAnchor);
            if (fuelCostModifier) {
                cost = fuelCostModifier(cost);
            }
            fuel += cost;
        }
        pastFuelCost.add(currentAnchor);
        if (leastFuel === undefined || leastFuel > fuel) {
            leastFuel = fuel;
            anchor = currentAnchor
        }
    }

    let currentAnchor = anchor - 1;
    while (currentAnchor > positions[0] && !uniqueAnchors.has(currentAnchor)) {
        let fuel = 0;
        for (const position of positions) {
            let cost = Math.abs(position - currentAnchor);
            if (fuelCostModifier) {
                cost = fuelCostModifier(cost);
            }
            fuel += cost;
        }
        pastFuelCost.add(currentAnchor);
        if (leastFuel === undefined || leastFuel > fuel) {
            leastFuel = fuel;
        }
        currentAnchor -= 1;
    }

    currentAnchor = anchor + 1;
    while (currentAnchor < positions[positions.length - 1] && !uniqueAnchors.has(currentAnchor)) {
        let fuel = 0;
        for (const position of positions) {
            let cost = Math.abs(position - currentAnchor);
            if (fuelCostModifier) {
                cost = fuelCostModifier(cost);
            }
            fuel += cost;
        }
        pastFuelCost.add(currentAnchor);
        if (leastFuel === undefined || leastFuel > fuel) {
            leastFuel = fuel;
        }
        currentAnchor += 1;
    }
    return leastFuel;
};

