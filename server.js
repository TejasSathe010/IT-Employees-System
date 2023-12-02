const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors');
const { logger, logEvents } = require('./middleware/logEvents');
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', (req, res) => {
    console.log('Request raised!!')
});


app.listen(PORT, () => { console.log('Server listening on port ' + PORT) });