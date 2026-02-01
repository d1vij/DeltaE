import type { LabColorArray, RGBColorArray } from "./types";

/**
 * Function to convert a RGB or RGBA color array to CIE-Lab color array using the 2° obeserver D65 reference illuminant values
 * @param colorArray Array containing indivisual RGB channel values. Providing alpha channel is not required since it gets ignored by the algorithm
 * @param decimalPrecision The number of decimals upto which the CIE-Lab color must be computed and returned.
 * @returns Array containing equivalent CIE-Lab color channels
 */
export function convertRgbToLab(
    colorArray: RGBColorArray,
    decimalPrecision: number = 2,
): LabColorArray {
    colorArray = [
        colorArray[0] / 255,
        colorArray[1] / 255,
        colorArray[2] / 255,
    ];

    for (let i = 0; i < 3; i++) {
        // biome-ignore lint/style/noNonNullAssertion: fixed array size
        const c = colorArray[i]!;
        colorArray[i] = c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
    }

    const xyz: RGBColorArray = [
        0.4124564 * colorArray[0] +
            0.3575761 * colorArray[1] +
            0.1804375 * colorArray[2],
        0.2126729 * colorArray[0] +
            0.7151522 * colorArray[1] +
            0.072175 * colorArray[2],
        0.0193339 * colorArray[0] +
            0.119192 * colorArray[1] +
            0.9503041 * colorArray[2],
    ];

    // https://en.wikipedia.org/wiki/Standard_illuminant#D65_values
    const Xn = 0.95047;
    const Yn = 1.0;
    const Zn = 1.08883;

    const fx = f(xyz[0] / Xn);
    const fy = f(xyz[1] / Yn);
    const fz = f(xyz[2] / Zn);

    const factor = 10 ** decimalPrecision;
    return [
        Math.round((116 * fy - 16) * factor) / factor, // L*
        Math.round(500 * (fx - fy) * factor) / factor, // a*
        Math.round(200 * (fy - fz) * factor) / factor, // b*
    ];
}

/**
 *
 * @param t Linear XYZ color channel normalized by its reference illuminant
 * @returns
 */
function f(t: number): number {
    if (t > 0.008856) {
        return t ** 0.3333333;
    } else {
        return 7.787 * t + 0.137931034;
    }
}
