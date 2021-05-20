//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var expect = require('chai').expect;

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");


var doOperation = require("../app1").doOperation;

// UNIT test begin
describe('GET /', function () {
      it('respond with html', function (done) {
            server
                  .get('/')
                  .expect('Content-Type', /html/)
                  .expect(200, done)
                  .expect('<h1>1 + 2 = 3</h1>');
      });
});

describe('GET /json/operations1.json', function () {
      it('respond with html', function (done) {
            server
                  .get('/json/operations1.json')
                  .expect('Content-Type', /html/)
                  .expect(200, done);
      });
});

describe('GET /calculate/:operation/:x/:y', function () {
      it('respond with html, operation +', function (done) {
            server
                  .get('/calculate/+/2/3')
                  .expect(200, done)
                  .expect('<h1>2 + 3 = 5</h1>');
      });
      it('respond with html, operation +', function (done) {
            server
                  .get('/calculate/+/1/1')
                  .expect(200, done)
                  .expect('<h1>1 + 1 = 2</h1>');
      });
      it('respond with html, operation -', function (done) {
            server
                  .get('/calculate/-/5/2')
                  .expect(200, done)
                  .expect('<h1>5 - 2 = 3</h1>');
      });
      it('respond with html, operation *', function (done) {
            server
                  .get('/calculate/*/6/7')
                  .expect(200, done)
                  .expect('<h1>6 * 7 = 42</h1>');
      });
});

describe('GET /results', function () {
      it('respond with html', function (done) {
            server
                  .get('/results')
                  .expect('Content-Type', /html/)
                  .expect(200, done);
      });
});


describe('doOperation', function () {
      it(' operation +', function () {
            const x = 1;
            const y = 2;
            const result = x + y;
            expect(doOperation("+", x, y)).to.equal(result);
      });
      it(' operation -', function () {
            const x = 5;
            const y = 2;
            const result = x - y;
            expect(doOperation("-", x, y)).to.equal(result);
      });
      it(' operation *', function () {
            const x = 3;
            const y = 7;
            const result = x * y;
            expect(doOperation("*", x, y)).to.equal(result);
      });
      it(' operation /', function () {
            const x = 10;
            const y = 5;
            const result = x / y;
            expect(doOperation("/", x, y)).to.equal(result);
      });
});