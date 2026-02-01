/**
 * Array representing RGB color as channels of Red, Green, Blue and optionally Alpha
 */
export type RGBColorArray =
    | [r: number, g: number, b: number]
    | [r: number, g: number, b: number, a: number];

/**
 * Array representing CIE-Lab color as channels of Lightness, a* and b*
 */
export type LabColorArray = [l: number, a: number, b: number];

/**
 * Weight parameters for DeltaE94 algorithm
 */
export type DeltaE94_Weights = {
    lightness: number; // kL
    chroma: number; // kC
    hue: number; // kH
};
