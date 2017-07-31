var controller = require('./controller.js');
var router = require('express').Router();

// get all user logs
router.get('/logs', controller.logs.get);

// post a new log
router.post('/logs', controller.logs.post);

// new user signup
router.post('/users/signup', controller.users.signup);

// new user signin
router.post('/users/signin', controller.users.signin);

module.exports = router;