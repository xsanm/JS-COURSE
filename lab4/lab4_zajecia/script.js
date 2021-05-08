const fs = require('fs');
var path = require('path');
var mime = require('mime-types');



function walk(dir, response) {
    var results = ``;
    let x = dir.split('/');
    response.write(`<li> ${x[x.length - 1]} </li>`);
    response.write(`<ul>`);
    let list = fs.readdirSync(dir);
    console.log(list);
    if (!list) { response.write(`</ul>`); return }
    var i = 0;
    next();

    function next() {
        var file = list[i++];
        if (!file) {
            response.write(`</ul>`);
            return;
        }
        file = dir + "/" + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file, response);
            next();
        } else {
            let x = file.split('/');
            response.write(`<li> ${x[x.length - 1]} </li>`);
            next();
        }

    };

};

function walkFile(file, response) {
    let x = fs.readFileSync(file) + '';
    let list = x.split(" ");
    response.write(`<ul>`);
    for (let i = 0; i < list.length - 1; i++) {

        if (list[i] === "class") {
            response.write(`<li> Klasa ${list[i + 1]} </li>`);
            //console.log(list[i + 1]);
        } else if (list[i] === "extends") {
            //console.log(list[i + 1]);
            try {
                if (mime.contentType(list[i + 1] + ".java") == "text/x-java-source; charset=utf-8") {
                    walkFile(list[i + 1] + ".java", response);
                }
            } catch (error) {
                continue;
            }

        }
    }
    response.write(`</ul>`);

}


function requestListener(request, response) {
    console.log("--------------------------------------");
    console.log("The relative URL of the current request: " + request.url + "\n");
    var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
    if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
        /* ************************************************** */
        console.log("Creating a response header");
        // Creating an answer header — we inform the browser that the body of the answer will be plain text
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        /* ************************************************** */
        console.log("Creating a response body");
        if (request.method == 'GET') { // If the GET method was used to send data to the server
            // Place given data (here: 'Hello name>') in the body of the answer
            const paths = url.searchParams.get('file').split(' ');
            console.log(paths);
            for (let path of paths) {
                let pathStats;
                try {
                    pathStats = fs.statSync(path);
                } catch (error) {
                    response.write("Object does not exist");
                    continue;
                }

                if (pathStats.isDirectory()) {
                    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    walk(path, response);
                } else {
                    //console.log(fs.readFileSync(path, 'utf-8'));
                    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    if (mime.contentType(path) == "text/x-java-source; charset=utf-8") {
                        walkFile(path, response);
                    }
                    //response.write('File\n');
                }


            }
            response.end();
            //response.write(`Hello ${url.searchParams.get('file')}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
        } else // If other method was used to send data to the server
            response.write(`This application does not support the ${request.method} method`);
        /* ************************************************** */
        console.log("Sending the response");
        //response.end(); // The end of the response — send it to the browser
    } else { // Generating the form
        /* ************************************************** */
        console.log("Creating a response header")
            // Creating a response header — we inform the browser that the body of the response will be HTML text
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        /* ************************************************** */
        console.log("Creating a response body");
        // and now we put an HTML form in the body of the answer
        response.write(`<form method="GET" action="/submit">
                                <label for="file">Give your filename</label>
                                <input name="file">
                                <br>
                                <input type="submit">
                                <input type="reset">
                            </form>`);
        /* ************************************************** */
        console.log("Sending the response");
        response.end(); // The end of the response — send it to the browser
    }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
var http = require("http");

var server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");