var User = require('mongoose').model('User'),
	encrypt = require('../utilities/encryption');

exports.getUsers = function (request, response) {
	User.find({}).exec(function (error, collection) {
		response.send(collection);
	});
};

exports.createUser = function (request, response, next) {
	var userData = request.body;
	userData.username = userData.username.toLowerCase();
	userData.salt  = encrypt.createSalt();
	userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
	User.create(userData, function (error, user) {
		if (error) {
			if (error.toString().indexOf('E11000') > -1) {
				error = new Error('Duplicate Username');
			}
			response.status(400);
			return response.send({reason : error.toString()});
		} 
		request.logIn(user, function (error) {
			if (error) {
				return next(error);
			}
			response.send(user);
		});
	});
};

exports.updateUser = function (request, response, next) {
	var userUpdates = request.body;

	if (request.user._id != userUpdates._id && !request.user.hasRole('admin')) {
		response.status(403);
		return response.end();
	}

	request.user.firstName = userUpdates.firstName;
	request.user.lastName = userUpdates.lastName;
	request.user.username = userUpdates.username;

	if (userUpdates.password && userUpdates.password.length > 0) {
		request.user.salt = encrypt.createSalt();
		request.user.hashed_pwd = encrypt.hashPwd(request.user.salt, userUpdates.password);
	}

	request.user.save(function (error) {
		if (error) {
			response.status(400);
			return response.send({reason : error.toString()});
		}
		response.send(request.user);
	});
};