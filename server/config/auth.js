var passport = require('passport');

exports.authenticate = function (request, response, next) {
	request.body.username = request.body.username.toLowerCase();
	var auth = passport.authenticate('local', function (error, user) {
		if (error) {
			return next(error);
		}
		if (!user) {
			response.send({success : false});
		}
		request.logIn(user, function (error) {
			if (error) {
				return next(error);
			}
			response.send({success : true, user : user });
		});
	});
	auth(request, response, next);
};

exports.requiresApiLogin = function (request, response, next) {
	if (!request.isAuthenticated()) {
		response.status(403);
		response.end();
	} else {
		next();
	}
};

exports.requiresRole = function (role) {
	return function (request, response, next) {
		if (!request.isAuthenticated() || request.user.roles.indexOf(role) === -1) {
			response.status(403);
			response.end();
		} else {
			next();
		}
	}
}