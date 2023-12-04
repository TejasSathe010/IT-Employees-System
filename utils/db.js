const mysql = require("mysql");

const db_conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tejas@3498",
    database: "employees_DB"
});

db_conn.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected to db!");
});

module.exports = db_conn;