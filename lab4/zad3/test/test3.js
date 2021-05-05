//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

describe('GET /submit?file=mock.txt', function() {
    it('respond with File and content', function(done) {
        server
            .get('/submit?file=mock.txt')
            .expect('Content-Type', /text\/plain/)
            .expect(200, "File\nqwerty", done);
    });
});

describe('GET /submit?file=test', function() {
    it('respond with Directory', function(done) {
        server
            .get('/submit?file=test')
            .expect('Content-Type', /text\/plain/)
            .expect(200, "Directory", done);
    });
});

describe('GET /submit?file=', function() {
    it('respond with wrong object', function(done) {
        server
            .get('/submit?file=')
            .expect('Content-Type', /text\/plain/)
            .expect(200, "Object does not exist", done);
    });
});