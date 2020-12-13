const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('./models/user');

//Initialize Passport.js Local strategy (Logging In)
passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function (username, password, cb) {
	return User.findOne({ username, password }).then((user) => {
		console.log('********', user)
		if (!user) {
			return cb(null, false, { message: 'Incorrect username/password' });
		}
		return cb(null, user, { message: 'Logged in Successfully' });
	}).catch((error) => {
		return cb(error);
	});
}));

//JWT Extractor from request
const tokenExtractor = (req) => {
	let token = null;
	if (req) {
		token = req.headers.token
	}
	return token
}

//Initialize Passport.js JWT Strategy for authentication
passport.use(new JWTStrategy({
	jwtFromRequest: tokenExtractor,
	secretOrKey: 'secret'
}, function (jwtPayload, cb) {
	return User.findById(jwtPayload.id).then((user) => {
		return cb(null, user);
	}).catch((error) => {
		return cb(error);
	});
}));

module.exports = passport;