const express = require("express");
const router = express.Router();
const db_conn = require("../utils/db");

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    db_conn.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({Status: false, Error: "Query Error"});
        return res.json({Status: true});
    })
});

module.exports = router;