const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { logger, logEvents } = require('./middleware/logEvents');
const adminRouter = require('./routes/adminRoute');
const addCategory = require('./routes/addCategoryRoute');
const getCategory = require('./routes/getCategoryRoute');
const addEmployee = require('./routes/addEmployeeRoute');
const getEmployee = require('./routes/getEmployeeRoute');
const employeeLogin = require('./routes/employeeRoute');
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.yoursite.com', 'http://localhost:3000', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public')); 

app.use('/employee', employeeLogin);
app.use('/auth', adminRouter);
app.use('/auth', addCategory);
app.use('/auth', getCategory);
app.use('/auth', addEmployee);
app.use('/auth', getEmployee);

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(token) {
        jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"});
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"});
    }
};

app.get('/verify', verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
});

app.listen(PORT, () => { console.log('Server listening on port ' + PORT) });