var http = require('http');
var uc = require('upper-case');
http.createServer(function (req, res) {
    let upperCase = uc.upperCase('hello, how are you?');
    // let titleCase = uc.titleCase('hello, how are you?');
    res.write(upperCase);
    res.end();
}).listen(3000);