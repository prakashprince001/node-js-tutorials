const mysql = require('mysql');

const mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'test_db'
});

mySqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to mysql!");
});

const queryPromise = (query) => {
    return new Promise((resolve, reject) => {
        mySqlConnection.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

async function testData() {
    const a = await queryPromise('select * from sessions');
    console.log(a[0].shop)
}
testData();

module.exports = {
    mySqlConnection,
    queryPromise
};