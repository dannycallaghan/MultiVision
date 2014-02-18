var auth = require('./auth'),
	users = require('../controllers/users'),
	courses = require('../controllers/courses')
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function (app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);

	app.post('/api/users', users.createUser);

	app.put('/api/users', users.updateUser);

	app.get('/api/courses', courses.getCourses);

	app.get('/partials/*', function (request, response) {
		response.render('../../public/app/' + request.params);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function (request, response) {
		request.logout();
		response.end();
	});

	app.all('/api/*', function (request, response) {
		response.send(404);
	});

	app.get('*', function (request, response) {
		response.render('index', {
			bootstrappedUser: request.user
		});
	});
};