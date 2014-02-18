var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	courseModel = require('../models/Course');
	
module.exports = function (config) {
	var userSchema, User;

	mongoose.connect(config.db);

	db = mongoose.connection;
	db
		.on('error', console.error.bind(console, 'db connection error...'))
		.once('open', function callback () {
			console.log('db connection opened...');
		});

	userModel.createDefaultUsers();

	courseModel.createDefaultCourses();
};