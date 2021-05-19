// Application using the 'Pug' template system
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

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', { res: `${x} + ${y} = ${x + y}` }); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
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

        for (op of oper.Operations) {
            let operationResult = doOperation(op.operation, op.x, op.y);
            op.result = operationResult;

        }
        res.render('index2', { operations: oper.Operations });

    });
});

app.get('/calculate/:operation/:x/:y', function (req, res) {
    let x = parseInt(req.params.x);
    let y = parseInt(req.params.y);
    let op = req.params.operation;
    let operationResult = doOperation(op, x, y);
    res.render('index', { res: `${x} ${op} ${y} = ${operationResult}` })

    const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    dbClient.connect(err => {
        const collection = dbClient.db("Operations").collection("op1");
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
        const collection = dbClient.db("Operations").collection("op1");
        collection.find({}, { projection: { _id: 0 } }).toArray((err, res2) => {
            console.log(res2);
            
            res.render('index2', { operations: res2 });
            dbClient.close();
        });
    });
    
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});