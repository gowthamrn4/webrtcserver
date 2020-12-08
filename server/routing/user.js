var express = require('express');
var userController = require('../controller/user');

var userRouting = express.Router();

userRouting.route('/register').post(userController.user_reg)
userRouting.route('/login').post(userController.user_login)
module.exports = userRouting