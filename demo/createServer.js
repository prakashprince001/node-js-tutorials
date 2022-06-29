var http = require('http');
http.createServer(function(req, res) {
    res.write("This is program for create node server.");
    res.end();
}).listen(3000);