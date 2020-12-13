var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
	User.findAll().then((users) => {
		console.log(users);
		res.send('ok');
	});
});
/* POST create a new user */
router.post('/', function (req, res, next) {
	console.log(req.body);
	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	User.create({ username: username, email: email, password: password }).then(() => {
		res.status(200).json({ status: 'OK', code: 200, data: { message: 'User was created!' } });
	}).catch((error) => {
		res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Error Occured: ' + error } });
	});
});

/* DELETE delete a user with an ID */
router.delete('/:userID', function (req, res, next) {
	let user_id = req.params.userID;
	User.destroy({
		where: {
			id: user_id
		}
	}).then(() => {
		res.status(200).json({ status: 'OK', code: 200, data: { message: 'User was Deleted!' } });
	}).catch((error) => {
		res.status(400).json({ status: 'Bad Request', code: 400, data: { message: 'Error Occured: ' + error } });
	});
});

module.exports = router;