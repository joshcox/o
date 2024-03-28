/**
 * Turn a `true` type into `false` and vice versa
 */
export type Not<T extends boolean> = T extends true ? false : true;

/**
 * Determine if an input type, `T`, is `true`
 */
export type IsTrue<T extends boolean> = T extends true ? true : false;

export type When<Bool, Consequent> = Bool extends true ? Consequent : never;

export type And<T, U> = [T, U] extends [true, true] ? true : false;

export type Every<T> = T extends [infer Head, ...infer Rest]
    ? And<Head, Every<Rest>>
    : never;