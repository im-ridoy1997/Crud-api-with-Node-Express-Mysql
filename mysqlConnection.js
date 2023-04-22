const mysql = require('mysql');

const connection = mysql.createConnection({
    'host': 'localhost',
    'user': 'root',
    'database': 'node_practice',
    'password': 'password'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to mysql server !');
});

module.exports = connection;