interface IPair {
    car: any;
    cdr: any;
}

class Pair<A = any, D = any> implements IPair {
    constructor(private readonly _car: A, private readonly _cdr: D) { }

    get car() { return this._car; }
    get cdr() { return this._cdr; }

    *[Symbol.iterator](): Generator<A, D, undefined> {
        yield this.car;
        let next = this.cdr;
        while (next instanceof Pair) {
            yield next.car;
            next = next.cdr;
        }
        return next;
    }
}

class List<A = any> extends Pair<A, List<A>> {
    public length: number;
    constructor(car: A, cdr: List<A>) {
        super(car, cdr);
        this.length = cdr.length + 1;
    }
}

class Empty extends List<any> {
    public length = 0;
    get car(): any { throw new Error("Empty list has no car"); }
    get cdr(): List { throw new Error("Empty list has no cdr"); }
    *[Symbol.iterator](): Generator<any, any, undefined> { }
}

export const empty = new Empty(undefined, <List><unknown>undefined);

export const isEmpty = (list: any): list is Empty => list instanceof Empty;

export const isList = <A>(list: unknown): list is List<A> | Empty => list instanceof List || isEmpty(list);

export function cons<A>(car: A, cdr: Empty): List<A>;
export function cons<A>(car: A, cdr: List<A>): List<A>;
export function cons<A, D>(car: A, cdr: D): Pair<A, D>;
export function cons(car: any, cdr: any): Pair {
    return isList(cdr) ? new List(car, cdr) : new Pair(car, cdr);
}

export function list(): Empty;
export function list<A>(...items: A[]): List<A>;
export function list(...items: any[]): List<any> | Empty {
    if (items.length === 0) return empty;
    let list = empty;
    for (const item of items) list = cons(item, list);
    return list;

}

export function car<A>(list: List<A>): A;
export function car<A, D>(pair: Pair<A, D>): A;
export function car(list: IPair): any {
    return list.car;
}

export function cdr<A>(list: List<A>): List<A>;
export function cdr<A, D>(pair: Pair<A, D>): D;
export function cdr(list: IPair): any {
    return list.cdr;
}

export function reduce<A, Acc>(fn: (acc: Acc, item: A) => Acc, seed: Acc, list: List<A>): Acc;
export function reduce(fn: (acc: any, item: any) => any, seed: any, list: Empty | List) {
    if (list instanceof Empty) return seed;
    for (const item of list) seed = fn(seed, item);
    return seed;
}

export function map<A, B>(fn: (a: A) => B, list: List<A>): List<B> {
    return reduce((acc, item) => cons(fn(item), acc), empty, list);
}

export function filter<A>(fn: (a: A) => boolean, list: List<A>): List<A> {
    return reduce((acc, item) => fn(item) ? cons(item, acc) : acc, empty, list);
}

export function find<A>(fn: (a: A) => boolean, list: List<A>): A | undefined {
    for (const item of list) if (fn(item)) return item;
}

export function forEach<A>(fn: (a: A) => void, list: List<A>) {
    for (const item of list) fn(item);
}

export function append<A>(list1: List<A>, list2: List<A>): List<A> {
    return reduce((acc, item) => cons(item, acc), list2, list1);
}

export function reverse<A>(list: List<A>): List<A> {
    return reduce((acc, item) => cons(item, acc), empty, list);
}


const ls = list(...new Set([1, 2, 3]));
const ls2 = cons('a', ls);