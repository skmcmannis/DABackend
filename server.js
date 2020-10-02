//Main server file
//Author: Shawn McMannis
//Last Update: 10/2/2020

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const basicAuth = require('./middleware/basic-auth');
const { connectDb } = require('./config/db');
const { connectS3 } = require('./config/s3');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route for static content
app.use(express.static(path.join(__dirname, '.', 'public')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
})

//Route for basic HTTP authentication
app.use(basicAuth);
app.use('/users', require('./users/user-controller'));

//Connect to database and start listener service
connectDb(function (err) {
    connectS3(function (err) {
        app.listen(process.env.PORT, (function(err) {
            if(err) throw err;
            console.log(`Server listening on port ${process.env.PORT}...`);
        }))
    })
})