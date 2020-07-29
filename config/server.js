//Main server file
//Author: Shawn McMannis
//Last Update: 7/27/2020

const express = require('express');
const app = express();
const path = require('path');

//Route for static content
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

//Connect to database and start listener service
app.listen(process.env.PORT, (function(err) {
    if(err) throw err;
    console.log(`Server listening on port ${process.env.PORT}...`);
}))