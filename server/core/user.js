const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res
            .status('403')
            .send({
                status: 'error',
                message: 'Token is missing'
            });
    }

    jwt.verify(token, 'secret', (error, decoded) => {
        if (error) {
            return res
                .status(401)
                .send({
                    status: 'error',
                    message: 'Failed to authenticate token'
                });
        }

        return res
            .status('200')
            .send({
                status: 'success',
                data: {
                    varification: decoded
                }
            });
    });
};