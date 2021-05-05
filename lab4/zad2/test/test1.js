/*
  Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'Assert'.
  If you prefer the 'Chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
  and then you need to uncomment the lines below.
*/

//----------------------------------------
// Mocha tests with CommonJS style imports
//----------------------------------------

// var expect = require('chai').expect;
var assert = require('assert');
var module = require('../skrypt');


describe('The isFileOrDirectory() method', function() {
    it('Returns File for mock.tst', function() {
        assert.strictEqual(module.isFileOrDirectory("mock.txt"), "File")
    });
    it('Returns Directory for test', function() {
        assert.strictEqual(module.isFileOrDirectory("test"), "Directory")
    });

    it('Returns no object for wrong path', function() {
        assert.strictEqual(module.isFileOrDirectory("asd.txt"), "Object does not exist")
    });


});