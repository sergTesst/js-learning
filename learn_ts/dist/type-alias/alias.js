"use strict";
const sanitize = (...args) => args;
function sanitizeInput(str) {
    return sanitize(str).join(' ');
}
let x = "hello";
x = 'hello';
function getFirstThree(x) {
    return x.slice(0, 3);
}
const req = { url: 'https://example.com', method: 'GET' };
function doSomething(x) {
    if (x === null) {
    }
    else {
        console.log('hello ' + x.toUpperCase());
    }
}
function liveDangerously(x) {
    console.log(x.toFixed());
}
const oneHundred = 100n;
const firstName = Symbol('name');
const secondName = Symbol('name');
//# sourceMappingURL=alias.js.map