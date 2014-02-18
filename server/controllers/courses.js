var Course = require('mongoose').model('Course');

exports.getCourses = function (request, response) {
	Course.find({}).exec(function (error, collection) {
		response.send(collection);
	});
}