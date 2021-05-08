"use strict";
var previousSum = 0;


while (true) {
    var input = window.prompt();
    if (input == null) {
        break;
    }
    console.log(input);
    console.log(numbers(input) + "\t" + letters(input) + "\t" + sum(input));
}


function numbers(data) {
    let result = 0;
    data = data.match(/\d+/g);
    if (data == null) {
        return 0;
    }
    data = data.map(Number).join("");
    for (let c of data) {
        result = result + parseInt(c);
    }
    return result;
}

function letters(data) {
    data = data.match(/\D/g);
    if (data == null) {
        return 0;
    }
    data.join("");

    return data.length;
}

function sum(data) {
    let length = 0;
    for (let i in data) {
        if (!isNaN(data[i])) {
            length += 1;
        } else {
            break;
        }
    }
    if (length > 0) {
        data = data.slice(0, length);
        previousSum += parseInt(data);
    }
    return previousSum;
}



var expect = chai.expect;
var previousSum = 0;

describe("NUMBERS", function() {
    it("Returns 3 for 111 numbers()", function() {
        expect(numbers("111")).to.equal(3);
    });
    it("Returns 0 for 111 letters()", function() {
        expect(letters("111")).to.equal(0);
    });
    it("Returns 15 for 2634 numbers()", function() {
        expect(numbers("2634")).to.equal(15);
    });
    it("Returns 0 for 2634 letters()", function() {
        expect(letters("2634")).to.equal(0);
    });
    it("Returns 12 for 0093 numbers()", function() {
        expect(numbers("0093")).to.equal(12);
    });
    it("Returns 0 for 0093 letters()", function() {
        expect(letters("0093")).to.equal(0);
    });
});

describe("LETTERS", function() {
    it("Returns 0 for qazws numbers()", function() {
        expect(numbers("qazws")).to.equal(0);
    });
    it("Returns 5 for qazws letters()", function() {
        expect(letters("qazws")).to.equal(5);
    });
    it("Returns 0 for qwer numbers()", function() {
        expect(numbers("qwer")).to.equal(0);
    });
    it("Returns 4 for qwer letters()", function() {
        expect(letters("qwer")).to.equal(4);
    });
});

describe("LETTERS -> NUMBERS", function() {
    it("Returns 11 for asd65 numbers()", function() {
        expect(numbers("asd65")).to.equal(11);
    });
    it("Returns 3 for asd65 letters()", function() {
        expect(letters("asd65")).to.equal(3);
    });
    it("Returns 9 for a333b numbers()", function() {
        expect(numbers("a333b")).to.equal(9);
    });
    it("Returns 2 for a333b letters()", function() {
        expect(letters("a333b")).to.equal(2);
    });
});

describe("NUMBERS -> LETTERS", function() {
    it("Returns 11 for 65asd numbers()", function() {
        expect(numbers("65asd")).to.equal(11);
    });
    it("Returns 3 for 65asd letters()", function() {
        expect(letters("65asd")).to.equal(3);
    });
    it("Returns 9 for 3a33b numbers()", function() {
        expect(numbers("3a33b")).to.equal(9);
    });
    it("Returns 3 for 3a33b letters()", function() {
        expect(letters("3a33b")).to.equal(2);
    });

});

describe("EMPTY", function() {
    it("Returns 0 for '' numbers()", function() {
        expect(numbers("")).to.equal(0);
    });
    it("Returns 0 for '' letters()", function() {
        expect(letters("")).to.equal(0);
    });
});


describe("TEST sum()", function() {
    it("Returns 0 for 'a45s4' sum()", function() {
        expect(sum("a45s4")).to.equal(0);
    });
    it("Returns 45 for '45a4' sum()", function() {
        expect(sum("45a4")).to.equal(45);
    });
    it("Returns 45 for 'aa89766' sum()", function() {
        expect(sum("aa89766")).to.equal(45);
    });
    it("Returns 2045 for '2000aa85a4' sum()", function() {
        expect(sum("2000aa85a4")).to.equal(2045);
    });

});