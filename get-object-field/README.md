## Install
```
npm install get-object-field
```

## Usage
```js
import gof from 'get-object-field';

const obj = {
    a: {
        b: 123,
        c: null,
        d: [1, 2, 3]
    }
};

gof(obj)('a')('b')()  // return 123
gof(obj)('a')('b')('d')()  // return undefined. (undefined is default value)
gof(obj, [])('a')('b')('d')()  // return []. (set default value)
gof(obj, [])('a')('c')()  // return []. (if field value is null or undefined, return default value)
gof(obj, [])('a')('d')(0)()  // return 1. (it work in array)
```