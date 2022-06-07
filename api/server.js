// BUILD YOUR SERVER HERE

const express = require('express');

const Users = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', (request, response) => {
    Users.find()
        .then(users => {
            response.json(users);
        })
        .catch(error => {
            response.status(500).json({
                message: 'The users information could not be retrieved'
            });
        });
});

server.get('/api/users/:id', (request, response) => {
    Users.findById(request.params.id)
        .then(user => {
            if (user === undefined) {
                response.status(404).json({
                    message: 'The user with the specified ID does not exist'
                });
            }
            response.json(user);
        })
        .catch(error => {
            response.status(500).json({
                message: 'The user information could not be retrieved'
            });
        });
});

server.post('/api/users', (request, response) => {
    const user = request.body;
    if (!user.name || !user.bio) {
        response.status(400).json({
            message: 'Please provide name and bio for the user'
        });
    } else {
        Users.insert(user)
        .then(newUser => {
            response.status(201).json(newUser);
        })
        .catch(error => {
            response.status(500).json({
                message: 'There was an error while saving the user to the database'
            });
        });
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
