var mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,

	User;

module.exports = function () {

	User = mongoose.model('User');
	passport.use(new LocalStrategy(
		function (username, password, done) {
			User.findOne({username : username}).exec(function (error, user) {
				if (user && user.authenticate(password)) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
	));
		
	passport.serializeUser(function (user, done)  {
		if (user) {
			done(null, user.id);
		}
	});

	passport.deserializeUser(function (id, done) {
		User.findOne({_id : id}).exec(function (error, user) {
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	});

}