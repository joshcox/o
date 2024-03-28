export type Args<Fn> = Fn extends (...args: infer Args) => any
    ? Args
    : never;

export type Arg<T> = T extends (arg: infer Arg) => any
    ? Arg
    : never;

type BooleanExtendsUnknown = boolean extends unknown ? true : false; //true
type UnkownExtendsBoolean = unknown extends boolean ? true : false; //false
type RestParametersExtendsUnknown = [...boolean[]] extends [...unknown[]] ? true : false; //false
type RestParametersOfFunctionExtendsUnknown = [...Args<() => boolean>] extends [...unknown[]] ? true : false; //true
type RestParametersOfFunctionExtendsUnknown2 = [...Args<(arg: boolean) => boolean>] extends [...unknown[]] ? true : false; //true
type RestParametersInFunctionExtendsUnknown = (...args: boolean[]) => boolean extends (...args: unknown[]) => boolean ? true : false; //false
type RestParametersInFunctionExtendsUnknown2 = (arg: boolean) => boolean extends (...args: unknown[]) => boolean ? true : false; //false

type T1 = [...boolean[]] extends [...unknown[]] ? true : false;