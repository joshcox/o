/**
 * Turn a `true` type into `false` and vice versa
 */
type Not<T> = T extends true ? false : T extends false ? true : never;

/**
 * Determine if an input type, `T`, is `true`
 */
type IsTrue<T> = Not<Not<T>>;

/**
 * Logical-and over two inputs, `T1` and `T2`
 */
type AndInner<T1, T2> = IsTrue<T1> extends true ? IsTrue<T2> : false;

/**
 * Variadic logical-and over a tuple of boolean types
 */
type And<Ts> = Ts extends [single: infer Only]
  ? IsTrue<Only>
  : Ts extends [first: infer First, ...rest: infer Rest]
  ? AndInner<First, And<Rest>>
  : false;

/**
 * Assert/Typecheck that `Input` is true
 */
type AssertTrue<Input extends true> = Input;