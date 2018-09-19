import {o} from "../src";

describe("o", () => {
    it("returns the identity function when no functions are composed", () => {
        const identity = o();
        expect(identity(5)).toBe(5);
        expect(identity("")).toBe("");
        expect(identity(true)).toBeTruthy();
        const obj: {} = {};
        expect(identity(obj)).toBe(obj);
        const arr: [] = [];
        expect(identity(arr)).toBe(arr);
    });

    it("returns the input function when one function is composed", () => {
        const square: (x: number) => number = o((x: number): number => x * x);
        expect(square(2)).toBe(4);
    });

    it("composes multiple functions into a pipeline from right to left", () => {
        const stringToSquare = o(
            (x: number): number => x * x,
            (s: string): number => parseInt(s, 10)
        );
        expect(stringToSquare("2")).toBe(4);
    });
});
