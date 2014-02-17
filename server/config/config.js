var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
module.exports = {
	development : {
		rootPath : rootPath,
		db : 'mongodb://localhost/multivision',
		port : process.env.PORT || 3030
	},
	production : {
		rootPath : rootPath,
		db : 'mongodb://dannycallaghan:multivision@ds027509.mongolab.com:27509/dannymultivision',
		port : process.env.PORT || 80
	}
}