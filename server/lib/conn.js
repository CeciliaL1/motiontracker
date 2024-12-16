const mysql = require('mysql2');

connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "Cecilia",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});


module.exports = connection;