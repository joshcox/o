/**
 * The Resolve type is a "pass-through" type alias. It does not modify the input type, T,
 * and is primarily used to force TypeScript to resolve a complex or recursive type at a specific point in a type chain.
 *
 * @example
 * // Trivial example: The Resolve type has no effect on simple types.
 * type A = Resolve<string>;  // A is just string
 *
 * @example
 * // Non-trivial example: In a recursive type, Resolve can be used to control the recursion.
 * type Recursive<T> = T extends { value: infer V, next: infer N } ? Resolve<{ value: V, next: Recursive<N> }> : never;
 * // Here, the Resolve type ensures that each level of the Recursive type is fully resolved before recursing.
 *
 * @template T The type to be passed through unchanged.
 */
export type Resolve<T extends unknown> = T;