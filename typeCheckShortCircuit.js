// short-circuit typeCheck - Object.is

const isNegZero = (x) => x == 0 && 1/x == -Infinity;

const isNaN = (x) => x != x;

const objectIs = R.curry((x, y) =>
    isNegZero(x) || isNegZero(y)
    ? isNegZero(x) && isNegZero(y)
    : isNaN(x) || isNaN(y)
        ? isNaN(x) && isNaN(y)
        : x === y
)


// tests:
console.log(objectIs(42,42) === true);
console.log(objectIs("foo","foo") === true);
console.log(objectIs(false,false) === true);
console.log(objectIs(null,null) === true);
console.log(objectIs(undefined,undefined) === true);
console.log(objectIs(NaN,NaN) === true);
console.log(objectIs(-0, -0) === true);
console.log(objectIs(0, 0) === true);
console.log(objectIs(-0, 0) === false);
console.log(objectIs(0, -0) === false);
console.log(objectIs(0,NaN) === false);
console.log(objectIs(NaN,0) === false);
console.log(objectIs(42,"42") === false);
console.log(objectIs("42",42) === false);
console.log(objectIs("foo","bar") === false);
