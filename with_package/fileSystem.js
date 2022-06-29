var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    fs.readFile('package-lock.json', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.writeHead(200, {'Content-Type': 'text/json'})
            res.write(data);
            return res.end();
        }
    })
}).listen(3000);