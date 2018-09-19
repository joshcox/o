# o
Type Safe function composition

## Usage
```typescript
const echo = compose();
const b = echo("string");

const square = compose((x: number): number => x * x);
const sq = square(2);

const strToSquare = compose(
    (x: number) => x * x,
    (t: string) => parseInt(t, 10),
);
const s1 = strToSquare("1");
const s2 = strToSquare("2");

const bazbar = compose(
    (x: number): number => x * 2,
    (x: string): number => parseInt(x, 10),
    (b: boolean): string => b ? "1" : "0"
);
const v1 = bazbar(true);
const v2 = bazbar(false);
```