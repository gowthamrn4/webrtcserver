var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */
router.get('/demo', function (req, res, next) {
  User.find(function (result, err) {
    console.log('**', result)
    res.send({ data: result })
  })
});

module.exports = router;