const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

const authHandler = require('./core/auth');
const userHandler = require('./core/user');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// user sign in
app.post('/api/auth', authHandler);

// get user data
app.get('/api/user', userHandler);

server.listen(port, () => {
    console.log('Server is running on port:', port);
});