var gof = require('./index');

var obj = {
    a: {
        b: false,
        c: null,
        d: undefined,
        e: [],
        f: '',
        g: 0,
        h: [1, 2, 3]
    }
};

var arr = [1, 2, 3, [4, 5]];

console.log(gof(obj)('a')('b')());
console.log(gof(obj)('a')('c')());
console.log(gof(obj)('a')('d')());
console.log(gof(obj)('a')('e')());
console.log(gof(obj)('a')('f')());
console.log(gof(obj)('a')('g')());
console.log(gof(obj)('a')('h')(1)());
console.log(gof(obj)('a')('h')(5)());
console.log('--------------');
console.log(gof(obj, [1])('a')('b')());
console.log(gof(obj, [1])('a')('c')());
console.log(gof(obj, [1])('a')('d')());
console.log(gof(obj, [1])('a')('e')());
console.log(gof(obj, [1])('a')('f')());
console.log(gof(obj, [1])('a')('g')());
console.log('--------------');
console.log(gof(arr)(0)());
console.log(gof(arr)(3)(1)());
console.log(gof(arr)(5)());
console.log(gof(arr)(3)(5)());
console.log(gof(arr, 123)(3)(5)());
console.log(gof(arr, 123)(1) + '');
console.log(+gof(arr, 123)(1));