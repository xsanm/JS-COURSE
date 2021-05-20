// No use of any template system
var express = require('express'),
    logger = require('morgan');

const fs = require('fs');
var app = express();
var x = 1;
var y = 2;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:qaz1wsx2@cluster0.pywgp.mongodb.net/Operations?retryWrites=true&w=majority";




function doOperation(operation, x, y) {
    switch (operation) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            if (y == 0) {
                throw new Error("Dividing by 0!");
            }
            return x / y;
        default:
            throw new Error("Invalid operation!");
    }
}

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Place an HTTP request recorder on the stack — each request will be logged in the console in 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {     // The first route
    res.send(`<h1>${x} + ${y} = ${x + y}</h1>`); // Send a response to the browser
});

app.get('/json/:fname', function (req, res) {
    let path = './json/' + req.params.fname;
    console.log(path);
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.status(404);
            throw err;
        }
        let oper = JSON.parse(data);

        let result = `
        <style>
            td { 
                padding: 20px;
                text-align: center; 
            }
        </style>
        <table>
            <tr>
                <td>x</td><td>Operation</td><td>y</td><td>Result</td>
            </tr>
        `;
        for (op of oper.Operations) {
            let operationResult = doOperation(op.operation, op.x, op.y);

            result = result.concat(`
                <tr><td>${op.x}</td><td>${op.operation}</td><td>${op.y}</td><td>${operationResult}</td></tr>
            `);

        }
        result = result.concat(`</table>`);
        res.status(200).send(result);

    });
});

app.get('/calculate/:operation/:x/:y', function (req, res) {
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let op = req.params.operation;
    let operationResult = doOperation(op, x, y);
    res.send(`<h1>${x} ${op} ${y} = ${operationResult}</h1>`);

    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(err => {
        const collection = dbClient.db("Operations").collection("op2");
        let toInsert = { operation: op, x: x, y: y, result: operationResult };
        collection.insertOne(toInsert, (err, res) => {
            if (err) throw err;
            console.log("Record insterted");
            dbClient.close();
        });
    });
});

app.get('/results', (req, res) => {
    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(err => {
        const collection = dbClient.db("Operations").collection("op2");
        collection.find({}, { projection: { _id: 0 } }).toArray((err, res2) => {
            let result = `
            <style>
                td { 
                    padding: 20px;
                    text-align: center; 
                }
            </style>
            <table>
                <tr>
                    <td>x</td><td>Operation</td><td>y</td><td>Result</td>
                </tr>
            `;
            for (op of res2) {
                let operationResult = doOperation(op.operation, op.x, op.y);
    
                result = result.concat(`
                    <tr><td>${op.x}</td><td>${op.operation}</td><td>${op.y}</td><td>${operationResult}</td></tr>
                `);
    
            }
            result = result.concat(`</table>`);
            res.status(200).send(result);

            dbClient.close();
        });
    });

});

// The application is to listen on port number 3000
if(!module.parent){
    app.listen(3000, function () {
        console.log('The application is available on port 3000');
    });
}

module.exports.doOperation = doOperation;