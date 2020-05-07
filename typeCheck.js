

// Functional typeCheck - Object.is

const { always, cond, equals, T, curry } = require('ramda');

const isItNegZero = (x) => x === 0 && 1/x === -Infinity;

const isNaN = (x) => x !== x;

const arrMethod = curry((m, f) => (...xs) => xs[m](f))

const objectIs = cond([
    [ arrMethod('some', isItNegZero), arrMethod('every', isItNegZero) ],
    [ arrMethod('every', isNaN), T ],
    [ T, equals ]
]);

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
