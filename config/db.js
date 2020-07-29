//Handles the database connection pool
//Author: Shawn McMannis
//Last Mod Date: 7/29/2020

const mysql = require('mysql2/promise')

let _pool;

//Create MySQL connection pool
function connectDb(callback) {
    if(_pool) {
        console.log("Already connected to the database");
        return callback(null, _pool);
    }
    
    try{
        _pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DATABASE
        });
        console.log("Connected to " + process.env.DATABASE);
        return callback(null, _pool);
    } catch (err) {
        console.log('Error encountered: ', err);
    }
}

//Return the database connection pool
function getDb() {
    if(_pool) return _pool;
    else {
        console.log("Not yet connected to the database");
    }
}

module.exports = {
    connectDb,
    getDb
};