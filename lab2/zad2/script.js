'use strict';

var expect = chai.expect;

function sum_(x, y) {
    return x + y;
}

describe('The sum() function', function() {
    it('Returns 4 for 2+2', function() {
        expect(sum_(2, 2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function() {
        expect(sum_(-2, 2)).to.equal(0);
    });
});