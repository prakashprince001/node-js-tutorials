var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database: 'boutique_simplified'
});
conn.connect(function(err) {
    if (err) throw err
    else {
        conn.query('select * from users', function(err, result) {
            if(err) throw err
            console.log('result',result[0].name)
        });
        console.log('Connected');
    }
});