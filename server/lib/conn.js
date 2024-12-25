const mysql = require("mysql2");

connection = mysql.createConnection({
  host: "cecilial.hemsida.eu/",
  port: "3000",
  user: "Cecilia",
  // password: process.env.DATABASE_PASSWORD,
  //database: process.env.DATABASE_NAME,
  // LOCAL
  password: process.env.SQL_LOQAL_PASS,
  database: process.env.SQL_LOQAL_DB_NAME,
});

module.exports = connection;
