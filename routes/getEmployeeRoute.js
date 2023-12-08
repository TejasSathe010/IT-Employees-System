const express = require("express");
const router = express.Router();
const db_conn = require("../utils/db");

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    db_conn.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    });
});

module.exports = router;