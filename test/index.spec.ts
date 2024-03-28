import { compose } from "../src";

describe("o", () => {
    it("returns the input function when one function is composed", () => {
        const square: (x: number) => number = compose((x: number): number => x * x);
        expect(square(2)).toBe(4);
    });

    it("composes multiple functions into a pipeline from right to left", () => {
        const stringToSquare = compose(
            (x: number): number => x * x,
            (s: string): number => parseInt(s, 10)
        );
        expect(stringToSquare("2")).toBe(4);
    });
});
