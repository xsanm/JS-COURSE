// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
const fs = require('fs');
var app = express();
var x = 1;
var y = 2;

//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://dbUser:qaz1wsx2@cluster0.pywgp.mongodb.net/Operations?retryWrites=true&w=majority";


// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');

app.use(express.urlencoded());
// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

const https = require("https");
const url = "https://komunikaty.tvp.pl/wojewodztwa?_format=json";

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:qaz1wsx2@cluster0.pywgp.mongodb.net/News?retryWrites=true&w=majority";



// Route definitions
app.get('/', function (req, respond) {      // The first route
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);

            respond.render('index2', { provinces: body.provinces });
        });
    });
});

app.get('/addToDb/:wojewodztwo/:kategoria', function (req, response) {
    https.get("https://komunikaty.tvp.pl/komunikatyxml/" + req.params.wojewodztwo + "/" + req.params.kategoria + "/1?_format=json", res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            //console.log(body);
            let toAdd = [];
            for (c of body.newses) {
                if (c.title !== null && c.content !== null) [
                    toAdd.push(c)
                ]
            }
            //response.render('index3', { comunicates: toShow });
            const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            dbClient.connect(err => {
                const collection = dbClient.db("Operations").collection("Newses");
                let toInsert = { title: c.title, content: c.content };
                collection.insert(toInsert, (err, res) => {
                    if (err) throw err;
                    console.log("Record insterted");

                    dbClient.connect(err => {
                        const collection = dbClient.db("Operations").collection("Newses");
                        collection.find({}, { projection: { _id: 0 } }).toArray((err, res2) => {

                            response.render('index3', { comunicates: res2 });
                            dbClient.close();
                        });
                    });
                });
            });
        });
    });
});

app.post('/', (req, response) => {
    console.log(req.body);
    let prov = req.body.prov;
    console.log(prov);
    https.get("https://komunikaty.tvp.pl/komunikatyxml/" + prov + "/wszystkie/1?_format=json", res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            let toShow = [];
            for (c of body.newses) {
                if (c.title !== null && c.content !== null) [
                    toShow.push(c)
                ]
            }
            response.render('index3', { comunicates: toShow });
            //console.log(toShow);
            //response.end();
        });
    });

})


// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});


