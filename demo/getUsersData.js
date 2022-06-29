var http = require('http');
var data = [
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" },
    { id:1, name:"Prakash Carpenter", city:"Indore" }
];
http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"application/json"});
    // res.write('{"id":1,"name":"Prakash"}');
    res.write(JSON.stringify(data));
    res.end();
}).listen(3000);