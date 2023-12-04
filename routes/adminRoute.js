const express = require("express");
const router = express.Router();
const db_conn = require("../utils/db");
const jwt = require("jsonwebtoken");

router.post("/adminlogin", (req, res) => {
  const sql_query = "SELECT * FROM admin WHERE email = ? and password = ?";
  db_conn.query(
    sql_query,
    [req.body.email, req.body.password],
    (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const token = jwt.sign(
          { role: "admin", email: result[0].email },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie('token', token);
        return res.json({ loginStatus: true });
      } else {
        res.json({ loginStatus: false, Error: "Wrong credentials" });
      }
    }
  );
});

module.exports = router;
