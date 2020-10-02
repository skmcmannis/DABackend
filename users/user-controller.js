//User authentication controller
//Author: Shawn McMannis
//Last Update: 10/2/2020
//Adapted from https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api

const express = require('express');
const router = express.Router();
const userService = require('./user-service');

//Routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}