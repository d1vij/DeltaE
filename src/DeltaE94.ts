import type { DeltaE94_Weights, LabColorArray } from "./types";

/**
 * Class to compute DeltaE of two Lab colors using the CIE-94 algorithm
 * @example
 * // Define weights
 * const weights: DeltaE94_Weights = {lightness:1, chroma: 1, hue: 1};
 * // Instantiate an instance
 * const DE94 = new DeltaE94(weights);
 * const delta_e = DE94.compute([255, 0, 0], [0, 255, 0]);
 */
export class DeltaE94 {
    private weights: DeltaE94_Weights;

    /**
     * Fixed constants defined by CIE
     */
    private K1: number;
    private K2: number;

    /**
     *
     * @param weights to scale the lightness, chroma and hue differences so that the color matches human perception. In most cases you would need to use _1_ all three
     */
    constructor(weights: DeltaE94_Weights) {
        this.weights = weights;

        // Assumes:
        // kL = 1 → graphic arts
        // kL ≠ 1 → textiles (common but implicit)
        if (this.weights.lightness === 1) {
            this.K1 = 0.045;
            this.K2 = 0.015;
        } else {
            this.K1 = 0.048;
            this.K2 = 0.014;
        }
    }

    public compute(c1: LabColorArray, c2: LabColorArray): number {
        const L = (c1[0] - c2[0]) / this.weights.lightness;

        // Chroma
        const c1_chroma = Math.hypot(c1[1], c1[2]);
        const c2_chroma = Math.hypot(c2[1], c2[2]);
        const delta_c = c1_chroma - c2_chroma;

        const A = delta_c / (this.weights.chroma * (1 + this.K1 * c1_chroma));

        // Hue
        const delta_H2 =
            (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2 - delta_c ** 2;

        const delta_H = Math.sqrt(Math.max(0, delta_H2));
        const scale_H = 1 + this.K2 * c1_chroma;

        const B = delta_H / (this.weights.hue * scale_H);

        return Math.hypot(L, A, B);
    }
}
