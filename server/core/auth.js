const userBase = require('../data/user');
const passManager = require('./password');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;

function _errorHandler(response) {
    return (status, data) => {
        return response
            .status(status)
            .send(data);
    };
}

function _checkUser(entity, input, callback) {
    if (entity === null) {
        callback(
            '404',
            {
                status: 'error',
                message: 'unknown user'
            }
        );

        return false;
    }

    if (!passManager.validate(entity.password, input.password)) {
        callback(
            '401',
            {
                status: 'error',
                message: 'wrong password'
            }
        );

        return false;
    }

    return true;
}

module.exports = function (request, response) {
    // connect to the "local" database
    MongoClient.connect('mongodb://localhost:27017/local', (error, db) => {
        if (error) {
            throw error;
        }

        db.collection('jwt').findOne({ user: request.body.user }, (error, user) => {
            if (error) {
                return response
                    .status('500')
                    .send({
                        status: 'error',
                        message: 'something happend with the server :('
                    });
            }

            if (_checkUser(user, request.body, _errorHandler(response))) {
                db.close();

                return response
                    .status('200')
                    .send({
                        status: 'success',
                        token: jwt.sign({ user: request.body.user }, 'secret')
                    });
            }

            db.close();
        });
    });
};