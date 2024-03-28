/**
 * Return a boolean type that indicates if one type extends another.
 *
 * Note: `T1` and `T2` are nested in single-element tuples to prevent Typescript from
 * distributing the conditional results over `T1` when it's a union
 */
export type Extends<T1, T2> = [T1] extends [T2] ? true : false;

/**
 * Determine if two types are the same type.
 */
export type Equal<T1, T2> = And<[Extends<T1, T2>, Extends<T2, T1>]>;