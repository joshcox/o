import { Every, When } from "./types/boolean";
import { Extends } from "./types/checks";
import { Arg } from "./types/function";

type Fn = (arg: any) => any;

type EntryFn = (...args: any[]) => any;

type AdjacentPairs<Fns extends any[]> = Fns extends [infer X1, infer X2, ...infer Rest]
    ? [[X1, X2], ...AdjacentPairs<[X2, ...Rest]>]
    : [];

type IsComposable<Pairs extends [any, any][]> = {
    [Index in keyof Pairs]: Extends<Arg<Pairs[Index][0]>, ReturnType<Pairs[Index][1]>>;
};

type ComposeFunctions<T extends any[]> = When<Every<IsComposable<AdjacentPairs<T>>>, T>;

export function compose(): () => void;
export function compose<R extends Fn>(fn: R): R;
export function compose<R extends Fn, U extends Fn[], F extends EntryFn>(...fns: ComposeFunctions<[R, ...U, F]>): (...args: Parameters<F>) => ReturnType<R>;
export function compose(...fns: [...Fn[], EntryFn]): (...args: any) => any {
    if (fns.length === 0) return () => { };
    if (fns.length === 1) return fns[0];
    else return (...args) => {
        const entry: EntryFn = fns[fns.length - 1];
        return fns.slice(0, -1).reduceRight((res, fn) => fn(res), entry(...args));
    }
}


const add2 = (x: number) => x + 2;
const toStr = (x: number) => x.toString();
const fromStr = (x: string) => parseInt(x, 10);

// inputs function types must flow properly from right to left
// const invalidInputs = compose(add2, toStr);

const noop = compose();
const add2Copy = compose(add2);
const add3 = compose(toStr, add2Copy, fromStr);