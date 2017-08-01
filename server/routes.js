var controller = require('./controller.js');
var router = require('express').Router();

// get all user logs
router.get('/logs/:username', controller.logs.get);

// post a new log
router.post('/logs/:username', controller.logs.post);

// delete a specific log
router.delete('/logs/:username', controller.logs.delete);

// new user signup
router.post('/users/signup', controller.users.signup);

// new user signin
router.post('/users/signin', controller.users.signin);

module.exports = router;