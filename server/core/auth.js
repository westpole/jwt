const userBase = require('../data/user');
const passManager = require('./password');
const jwt = require('jsonwebtoken');

function getUserPasswordHash(user) {
    return userBase.credentials[user];
}

module.exports = function (req, res) {
    if (userBase.authUsers.indexOf(req.body.user) < 0) {
        return res
            .status('404')
            .send({
                status: 'error',
                message: 'unknown user'
            });
    }

    if (!passManager.validate(getUserPasswordHash(req.body.user), req.body.password)) {
        return res
            .status('401')
            .send({
                status: 'error',
                message: 'wrong password'
            });
    }

    return res
        .status('200')
        .send({
            status: 'success',
            token: jwt.sign({ user: req.body.user }, 'secret')
        });
};