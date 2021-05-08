//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

describe('GET /submit?file=mock_dir', function() {
    it('respond with File and content', function(done) {
        server
            .get('/submit?file=mock_dir')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, '<li> mock_dir </li><ul><li> katalog1 </li><ul><li> katalog2 </li><ul><li> plik3 </li></ul><li> plik2 </li></ul><li> plik1 </li><li> plik4 </li></ul>', done);
    });

});
describe('GET /submit?file=A.java', function() {

    it('respond with File and content', function(done) {
        server
            .get('/submit?file=A.java')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200, '<ul><li> Klasa A </li><ul><li> Klasa B </li><li> Klasa C </li></ul><li> Klasa D </li></ul>', done);
    });
});