import type { RGBColorArray } from "./types";

/**
 * Converts HEX color strings to RGB channels array
 * Preceeding '#' is optional
 * Function does not throw any error and returns [0,0,0] in case the parsing failed
 * @param hex HEX string representation of rgb color.
 * @returns Array representing RGB color as channels of Red, Green, Blue and optionally Alpha
 */
export function hexToRGBArray(hex: string): RGBColorArray {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    try {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(
            shorthandRegex,
            (_, r, g, b) => r + r + g + g + b + b,
        );

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result
            ? [
                  parseInt(result[1] || "0", 16),
                  parseInt(result[2] || "0", 16),
                  parseInt(result[3] || "0", 16),
              ]
            : [0, 0, 0];
    } catch {
        return [0, 0, 0];
    }
}
