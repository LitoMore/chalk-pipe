'use strict';

const chalkPipe = require('.');

console.log();
console.log(chalkPipe('dim.#ffffff')('dim.#ffffff'));
console.log(chalkPipe('cyan.underline')('cyan.underline'));
console.log(chalkPipe('orange.bold')('orange.bold'));
console.log(chalkPipe('bgCyan.black')('bgCyan.black'));
