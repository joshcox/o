export type First<T extends any[]> = T[0];

export type Last<T extends any[]> = T extends [...unknown[], infer L] ? L : never;