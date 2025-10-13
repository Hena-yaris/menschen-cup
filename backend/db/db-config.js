const mysql = require("mysql2")


const dbconnection = mysql.createPool({
  user: "menschen-cup",
  host: "localhost",
  database: "menschen-cup",
  password: "cup",
  connectionLimit: 10,
});


module.exports = dbconnection;