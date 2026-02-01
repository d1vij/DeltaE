import { expect, test } from "bun:test";
import { convertRgbToLab } from "../src";

/**
 * Some tests are expected to fail due to the nuances of decimal precision or color mapping
 * Every test passes with atleast precision of 0
 */

function expectLabClose(
    actual: [number, number, number],
    expected: [number, number, number],
    precision = 2,
) {
    expect(actual[0]).toBeCloseTo(expected[0], precision);
    expect(actual[1]).toBeCloseTo(expected[1], precision);
    expect(actual[2]).toBeCloseTo(expected[2], precision);
}

test("black → lab", () => {
    expectLabClose(convertRgbToLab([0, 0, 0]), [0.0, 0.0, 0.0]);
});

test("white → lab", () => {
    expectLabClose(convertRgbToLab([255, 255, 255]), [100.0, 0.0, 0.0]);
});

test("dark gray → lab", () => {
    expectLabClose(convertRgbToLab([64, 64, 64]), [27.09, 0.0, 0.0]);
});

test("mid gray → lab", () => {
    expectLabClose(convertRgbToLab([128, 128, 128]), [53.59, 0.0, 0.0]);
});

test("light gray → lab", () => {
    expectLabClose(convertRgbToLab([192, 192, 192]), [77.7, 0.0, 0.0]);
});

test("red → lab", () => {
    expectLabClose(convertRgbToLab([255, 0, 0]), [53.24, 80.09, 67.2]);
});

test("green → lab", () => {
    expectLabClose(convertRgbToLab([0, 255, 0]), [87.73, -86.18, 83.18]);
});

test("blue → lab", () => {
    expectLabClose(convertRgbToLab([0, 0, 255]), [32.3, 79.19, -107.86]);
});

test("yellow → lab", () => {
    expectLabClose(convertRgbToLab([255, 255, 0]), [97.14, -21.55, 94.48]);
});

test("cyan → lab", () => {
    expectLabClose(convertRgbToLab([0, 255, 255]), [91.11, -48.09, -14.13]);
});

test("grayscale has zero chroma", () => {
    for (let v = 0; v <= 255; v += 5) {
        const [, a, b] = convertRgbToLab([v, v, v]);
        expect(Math.abs(a)).toBeLessThan(0.01);
        expect(Math.abs(b)).toBeLessThan(0.01);
    }
});

test("lighter rgb → higher L*", () => {
    const [L1] = convertRgbToLab([50, 50, 50]);
    const [L2] = convertRgbToLab([200, 200, 200]);
    expect(L2).toBeGreaterThan(L1);
});
