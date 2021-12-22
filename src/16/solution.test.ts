import { readFileIntoStringArray } from '../utils/files';
import { hexToBin, decodeVersionSum } from './solution';

describe('16a', () => {
    it('hexToBin for D2FE28 should return 110100101111111000101000', () => {
        expect(hexToBin('D2FE28')).toEqual('110100101111111000101000');
    });

    it('hexToBin for 38006F45291200 should return 00111000000000000110111101000101001010010001001000000000', () => {
        expect(hexToBin('38006F45291200')).toEqual('00111000000000000110111101000101001010010001001000000000');
    });

    it('hexToBin for EE00D40C823060 should return 11101110000000001101010000001100100000100011000001100000', () => {
        expect(hexToBin('EE00D40C823060')).toEqual('11101110000000001101010000001100100000100011000001100000');
    });

    it('hexToBin for 8A004A801A8002F478 should return 100010100000000001001010100000000001101010000000000000101111010001111000', () => {
        expect(hexToBin('8A004A801A8002F478')).toEqual('100010100000000001001010100000000001101010000000000000101111010001111000');
    });

    it('decodeVersionSum for 8A004A801A8002F478 should return 16', () => {
        expect(decodeVersionSum('8A004A801A8002F478')).toEqual(16);
    });

    it('decodeVersionSum for 620080001611562C8802118E34 should return 12', () => {
        expect(decodeVersionSum('620080001611562C8802118E34')).toEqual(12);
    });

    it('decodeVersionSum for C0015000016115A2E0802F182340 should return 23', () => {
        expect(decodeVersionSum('C0015000016115A2E0802F182340')).toEqual(23);
    });

    it('decodeVersionSum for A0016C880162017C3686B18A3D4780 should return 31', () => {
        expect(decodeVersionSum('A0016C880162017C3686B18A3D4780')).toEqual(31);
    });

    it('decodeVersionSum for input file should return 852', () => {
        expect(decodeVersionSum(readFileIntoStringArray('./src/16/input.txt')[0])).toEqual(852);
    });
})