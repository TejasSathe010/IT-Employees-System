const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db_conn = require("../utils/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name, email, password, salary, address, image, category_id) 
    VALUES (?)`;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({Status: false, Error: err});
        }
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.salary, 
            req.body.address,
            req.file.filename,
            req.body.category_id
        ]
        db_conn.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        });
    });
});

module.exports = router;