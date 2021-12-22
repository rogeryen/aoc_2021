interface IPacket {
    version: number,
    type: number,
    literalValue?: number,
    lengthType?: number,
    subPackets: IPacket[],
}

export const hexToBin = (hex: string): string => {
    return hex.split('').map((d) => parseInt(d, 16).toString(2).padStart(4, '0')).join('')
}

const shiftBits = (bits: string[], numOfBits: number): string[] => {
    const shifted: string[] = [];
    for (let i = 0; i < numOfBits; i++) {
        const removed = bits.shift();
        if (removed) {
            shifted.push(removed);
        }
    }
    return shifted;
}

const parseBitsAndShift = (bits: string[], numOfBits: number): number => {
    return parseInt(shiftBits(bits, numOfBits).join(''), 2);
}

const parsePacket = (bitArray: string[]): IPacket[] => {
    const packet: IPacket = {
        version: parseBitsAndShift(bitArray, 3),
        type: parseBitsAndShift(bitArray, 3),
        subPackets: []
    };

    if (packet.type === 4) {
        // literal value
        let groupHead = parseBitsAndShift(bitArray, 1);
        let value: string[] = shiftBits(bitArray, 4);
        while (groupHead === 1) {
            groupHead = parseBitsAndShift(bitArray, 1);
            value = value.concat(shiftBits(bitArray, 4));
        }
        packet.literalValue = parseInt(value.join(''), 2);
        return [packet]
    } else {
        // sub operator packet
        packet.lengthType = parseBitsAndShift(bitArray, 1);
        if (packet.lengthType === 0) {
            const length = parseBitsAndShift(bitArray, 15);
            const subPacket = shiftBits(bitArray, length);
            while (subPacket.length >= 11) {
                packet.subPackets = packet.subPackets.concat(parsePacket(subPacket));
            }
        } else {
            const numOfPackets = parseBitsAndShift(bitArray, 11);
            for (let i = 0; i < numOfPackets; i++) {
                packet.subPackets = packet.subPackets.concat(parsePacket(bitArray));
            }
        }
    }
    return [packet];
}

export const decodeVersionSum = (hex: string): number => {
    const bitArray = hexToBin(hex).split('')
    const packets = parsePacket(bitArray);
    return sumPacketVersions(packets[0])
}

const sumPacketVersions = (packet: IPacket): number => {
    let sum = 0;
    sum += packet.version;
    for (const subPacket of packet.subPackets) {
        sum += sumPacketVersions(subPacket);
    }
    return sum;
}

export const calculateOuterPacketValue = (hex: string): number => {
    const bitArray = hexToBin(hex).split('')
    const packet = parsePacket(bitArray)[0];

    return calculatePacketValue(packet);
}

const calculatePacketValue = (packet: IPacket): number => {
    if (packet.type === 4) {
        return packet.literalValue || 0;
    } else {
        const subPacketValues: number[] = [];
        for (const subPacket of packet.subPackets) {
            subPacketValues.push(calculatePacketValue(subPacket));
        }
        if (packet.type === 0) {
            return subPacketValues.reduce((sum, curr) => sum + curr, 0);
        } else if (packet.type === 1) {
            return subPacketValues.reduce((prod, curr) => prod * curr, 1);
        } else if (packet.type === 2) {
            return Math.min(...subPacketValues);
        } else if (packet.type === 3) {
            return Math.max(...subPacketValues);
        } else if (packet.type === 5) {
            return subPacketValues[0] > subPacketValues[1] ? 1 : 0;
        } else if (packet.type === 6) {
            return subPacketValues[0] < subPacketValues[1] ? 1 : 0;
        } else if (packet.type === 7) {
            return subPacketValues[0] === subPacketValues[1] ? 1 : 0;
        }
    }

    return 0;
}