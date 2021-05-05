//import { Operation } from './module.js';

var module = require('./module');


const op1 = new module.Operation(parseInt(process.argv[2]), parseInt(process.argv[3]));
console.log(op1);
console.log(op1.sum());