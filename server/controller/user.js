const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const express = require('express');
let app = express();
var config = 'ilovescotchyscotch'
app.set('superSecret', config.secret);

var user_reg = function (req, res) {
    var email = req.body.email;
    if (req.body.email == '' || req.body.name == '' || req.body.password == '') {
        res.send({ message: 'something went wrong' })
    } else {
        userModel.findOne({ email }, function (err, result) {
            if (result == null) {
                var newUser = new userModel(req.body);
                newUser.save(function (err,
                    result) {
                    if (err) {
                        res.send({
                            message: 'Error '
                        })
                    } else {
                        res.send({ message: 'Register Success.Please Login', success: true, data: result });
                    }
                })
            } else {
                res.send({
                    message: 'This Email Already Exsit..'
                })
            }
        })
    }
}



var user_login = function (req, res) {
    var email = req.body.email;
    var status;
    // find the user
    if (req.body.email == '' || req.body.password == '') {
        res.send({ message: 'something went wrong' })
    } else {
        userModel.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.send({ message: 'Login Failed' })
            }

            if (!user) {
                res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.send({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const payload = {
                        id: user.id,
                        email: user.email,
                    };
                    console.log(payload);
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    console.log(user)
                    // return the information including token as JSON
                    res.send({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                        user: user
                    });
                }
            }
        });
    }

}


module.exports = {
    user_reg: user_reg,
    user_login: user_login
}