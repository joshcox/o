import { Every, When } from "./types/boolean";
import { Extends } from "./types/checks";
import { Resolve } from "./types/control";
import { Arg, Args, Return } from "./types/function";
import { First, Last } from "./types/tuple";

type Fn = (arg: any) => any;

type EntryFn = (...args: any[]) => any;

type ComposeFnTuple = [...Fn[], EntryFn];

type AdjacentPairs<Fns extends any[]> = Fns extends [infer X1, infer X2, ...infer Rest]
    ? [[X1, X2], ...AdjacentPairs<[X2, ...Rest]>]
    : [];

type IsComposable<Pairs extends [any, any][]> = {
    [Index in keyof Pairs]: Extends<Arg<Pairs[Index][0]>, Return<Pairs[Index][1]>>;
};

type ComposeFunctions<T extends any[]> = When<Every<IsComposable<AdjacentPairs<T>>>, T>;

type ComposeReturn<T extends any[]> = Resolve<(...args: Args<Last<T>>) => Return<First<T>>>;

export function compose(...fns: []): never;
export function compose<Fns extends [EntryFn]>(...fns: Fns): Fns[0];
export function compose<Fns extends ComposeFnTuple>(...fns: Fns): ComposeReturn<Fns>;
export function compose<Fns extends ComposeFnTuple>(
    ...fns: [...ComposeFunctions<Fns>]
): ComposeReturn<Fns> {
    if (fns.length === 0) {
        throw new Error('compose requires at least one function');
    }
    if (fns.length === 1) {
        return fns[0] as ComposeReturn<Fns>;
    }

    return (...args) => {
        const first: EntryFn = fns[fns.length - 1];
        return fns.slice(0, -1).reduceRight((res, fn) => fn(res), first(...args));
    }
}

const fromStr = compose((x: string) => parseInt(x, 10));
const add2 = (x: number) => x + 2;
const toStr = (x: number) => x.toString();

const add3 = compose(toStr, add2, fromStr);