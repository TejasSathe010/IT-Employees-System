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

router.get('/admin_count', (req, res) => {
  const sql = "select count(id) as admin from admin";
  db_conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  });
});

router.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  db_conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  });
});

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  db_conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  });
});

router.get('/admin_records', (req, res) => {
  const sql = "select * from admin"
  db_conn.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
});

module.exports = router;
