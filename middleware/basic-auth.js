//Basic HTTP authentication middleware
//Author: Shawn McMannis
//Last Update: 9/29/2020
//Adapted from https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

const userService = require('../users/user-service');

async function basicAuth(req, res, next) {
    //Make authentication path public
    if (req.path === '/authenticate') {
        return next();
    }

    //Check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic' === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header'});
    }

    //Verify credentials
    const base64Credentials = req.header.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    }

    //Attach user to request object
    req.user = user;

    next();
}

module.exports = {
    basicAuth
}