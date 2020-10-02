//Authenticates user credentials
//User authentication service
//Author: Shawn McMannis
//Last Update: 10/2/2020
//Adapted from https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

const db = require('../config/db.js');

async function authenticate({ username, password }) {
    const user = await db.getDb().query('SELECT * FROM credentials WHERE username = ? AND password = ?', [username, password]);
    if (user) return username;
}

async function getAll() {
    const users = await db.getDb().query('SELECT * FROM credentials');
    return users.map(u => {
        const { password, ...usernames } = u;
        return usernames;
    });
}

module.exports = {
    authenticate,
    getAll
}