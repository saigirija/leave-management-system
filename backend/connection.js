const mysql = require("mysql2");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DATABASEPORT,
  database: process.env.DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("mysql connected");
});

exports.databaseConnection = con.promise();
