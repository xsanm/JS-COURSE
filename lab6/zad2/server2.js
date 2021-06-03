function onRequest_8080(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });

    response.write(`
        <script>

            function download() {
                let remote = document.getElementById("remote");
                let newRemote = document.createElement('div');
                let newRemoteContent = document.createTextNode("Downloading data");
                newRemote.appendChild(newRemoteContent);
                newRemote.setAttribute("id", "remote")
                
                let parent = remote.parentNode;
                parent.replaceChild(newRemote, remote)
                getTimeData();
            }

            function getTimeData() {
                const area = document.getElementById('area').value;
                const location = document.getElementById('location').value;
                console.log(area);
                console.log(location);
                fetch('http://worldtimeapi.org/api/timezone/' + area + '/' + location)
                    .then(response => response.json())
                    .then(result => {
                        let remote = document.getElementById("remote");
                        let newRemote = document.createElement('div');
                        let newRemoteContent = document.createTextNode(result.datetime);
                        newRemote.appendChild(newRemoteContent);
                        newRemote.setAttribute("id", "remote")
                        let parent = remote.parentNode;
                        parent.replaceChild(newRemote, remote)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            
            }
            fetch('http://localhost:8081/')
            .then(response => response.text())
            .then(html => {
                let responseDocument = (new DOMParser()).parseFromString(html, 'text/html')
                let date = responseDocument.getElementById("data")
                let time = responseDocument.getElementById("czas")
                let local = document.getElementById("local");
                let newLocal = document.createElement('div');
                newLocal.setAttribute("id", "local");
                newLocal.appendChild(date)
                newLocal.appendChild(time)
                let parent = local.parentNode;
                parent.replaceChild(newLocal, local)
            })
            .catch(err => {
                console.log(err);
            })

        </script>

        <form>
            <label for="area">Area</label>
            <input type="text" name="area" id="area">
            <br>
            <label for="location">Location</label>
            <input type="text" name="location" id="location">
            <br>
            <input type="button" value="Pobierz" onclick="download()">
        </form>

        <h1>Remote</h1>
        <div id='remote'>
            Remote date and time
        </div>
        <!-- ***************** -->
        <h1>Local</h1>
        <div id='local'>
            Local date and time
        </div>`
    );
    response.end();
}

function onRequest_8081(request, response) {
    let date = new Date();
    response.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
    response.write(`
        <div>
            <span id="data">${date.toDateString()}</span>
            <br>
            <span id="czas">${date.toTimeString()}</span>
        </div>`
    );
    response.end();
}

/* ************************************************** */
/* Main block
/* ************************************************** */
var http = require('http');

http.createServer(onRequest_8080).listen(8080);
http.createServer(onRequest_8081).listen(8081);
console.log("The server was started on port 8080 and 8081");
console.log("To stop the server, press 'CTRL + C'");
