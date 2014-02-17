var auth = require('./auth'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function (app) {

	app.get('/api/users', auth.requiresRole('admin'), function (request, response) {
		User.find({}).exec(function (error, collection) {
			response.send(collection);
		});
	});

	app.get('/partials/*', function (request, response) {
		response.render('../../public/app/' + request.params);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function (request, response) {
		request.logout();
		response.end();
	});

	app.get('*', function (request, response) {
		response.render('index', {
			bootstrappedUser: request.user
		});
	});
};