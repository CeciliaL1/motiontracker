const mysql = require("mysql2");

connection = mysql.createConnection({
  //host: "cecilial.hemsida.eu/",
  host: "localhost",
  port: "3306",
  user: "Cecilia",
  // password: process.env.DATABASE_PASSWORD,
  //database: process.env.DATABASE_NAME,
  // LOCAL
  password: process.env.SQL_LOCAL_PASS,
  database: process.env.SQL_LOCAL_DB_NAME,
});

module.exports = connection;
