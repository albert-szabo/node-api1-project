// BUILD YOUR SERVER HERE

const express = require('express');

const Users = require('./users/model');

const server = express();

server.get('/api/users', (request, response) => {
    Users.find()
        .then(users => {
            response.json(users);
        })
        .catch(error => {
            response.status(500).json({
                message: 'The users information could not be retrieved'
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
