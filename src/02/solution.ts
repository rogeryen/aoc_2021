export const calculatePositionValue = (commands: string[]): number => {
    let horizontal = 0;
    let depth = 0;

    for (const command of commands) {
        const [action, value] = command.split(' ');
        if (action === 'forward') {
            horizontal += parseInt(value);
        } else if (action === 'down') {
            depth += parseInt(value);
        } else if (action === 'up') {
            depth -= parseInt(value);
        }
    }
    return horizontal * depth + 0;
}

export const calculatePositionValueWithAim = (commands: string[]): number => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for (const command of commands) {
        const [action, value] = command.split(' ');
        if (action === 'forward') {
            horizontal += parseInt(value);
            depth += (parseInt(value) * aim);
        } else if (action === 'down') {
            aim += parseInt(value);
        } else if (action === 'up') {
            aim -= parseInt(value);
        }
    }
    return horizontal * depth + 0;
}