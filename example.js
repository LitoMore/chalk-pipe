'use strict';

const chalk = require('chalk');
const chalkPipe = require('.');

const fakeChalk = new chalk.constructor({enabled: false});

console.log();
console.log(chalkPipe('dim.#ffffff')('dim.#ffffff'));
console.log(chalkPipe('cyan.underline')('cyan.underline'));
console.log(chalkPipe('orange.bold')('orange.bold'));
console.log(chalkPipe('bgCyan.black')('bgCyan.black'));
console.log(chalkPipe('bgCyan.black', fakeChalk)('bgCyan.black'));
