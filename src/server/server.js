const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const api = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
    console.log(`Endpoint : ${req.method} ${req.url}`);
    next();
});


// set up the middleware
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

// set up the app to use the route from routes.js
app.use('/api/v1/', api);

// serve the compiled files at public folder
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, '../../public')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });
};



app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    });
});

// set up the server
app.listen(port, () => console.log(`Running on port ${port}...`));




