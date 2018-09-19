// Get the type of the first argument of a function
type ArgumentType<T> = T extends (a: infer U) => any ? U : any;

// Get the head type from a tuple of types
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;

// Get the tail type from a tuple of types
type Tail<T extends any[]> = ((...t: T) => void) extends ((h: any, ...rest: infer R) => void) ? R : never;

// Get the Last type from a tuple of types
type Last<T extends any[]> = Last_<T>;
type Last_<T extends any[]> = {
    0: Head<T>,
    1: Last_<Tail<T>>
}[T extends [any] ? 0 : 1];

// Create the Composed function signature by creating a function type where
// the input is the argument type of the last function and the output is the return type
// of the first function
type ComposeSignature<FS extends Array<(a: any) => any>> =
    (arg: ArgumentType<Last<FS>>) =>
        FS extends [infer HEAD, ...any[]]
            ? HEAD extends (a: any) => any
                ? ReturnType<HEAD>
                : never
            : never;

// Validate passthrough/intermediate types
// compose(string -> boolean, number -> string) - will ensure that the itermediate value exchanges type correctly
type Composed<FS extends Array<(a: any) => any>> = Composed_<FS, FS>;
type Composed_<S extends Array<(a: any) => any>, T extends Array<(a: any) => any>> = {
    0: ComposeSignature<S>,
    // @ts-ignore
    1: Head<Tail<T>> extends (a: any) => infer R
        ? ArgumentType<Head<T>> extends R
            ? Composed_<S, Tail<T>>
            : never
        : never
}[T extends [any] ? 0 : 1];

function compose(): <A>(arg: A) => A;
function compose<F extends (arg: any) => any>(f: F): F;
function compose<FS extends Array<(arg: any) => any>>(...fns: FS): Composed<FS>;
function compose<FS extends Array<(arg: any) => any>>(...fns: FS) {
    return <A>(arg: A) => fns.reduce((a, f) => f(a), arg);
}

export { compose as o };
