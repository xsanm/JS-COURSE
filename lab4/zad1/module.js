/**
 * @author Kamil Kurowski
 * Class respresents operation 
 * 
 */

class Operation {

    /**
     * 
     * @constructor
     * @param {*} x first paramter of operation
     * @param {*} y second paramter of operation
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 
     * @returns sum of x and y
     */

    sum() {
        return this.x + this.y;
    }
}

module.exports.Operation = Operation;
//export { Operation };