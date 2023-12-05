const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const adminRouter = require('./routes/adminRoute');
const addCategory = require('./routes/addCategoryRoute');
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
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', adminRouter);
app.use('/auth', addCategory);


app.listen(PORT, () => { console.log('Server listening on port ' + PORT) });