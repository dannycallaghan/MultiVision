var mongoose = require('mongoose');
	crypto = require('crypto');

module.exports = function (config) {
	var userSchema, User;

	mongoose.connect(config.db);

	db = mongoose.connection;

	db
		.on('error', console.error.bind(console, 'db connection error...'))
		.once('open', function callback () {
			console.log('db connection opened...');
		});

	userSchema = mongoose.Schema({
		firstName : String,
		lastName : String,
		username : String,
		salt : String,
		hashed_pwd : String,
		roles : [String]
	});

	userSchema.methods = {
		authenticate : function (passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}

	User = mongoose.model('User', userSchema);

	User.find({}).exec(function (error, collection) {
		if ( collection.length === 0 ) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'danny');
			User.create({firstName : 'Danny', lastName : 'Callaghan', username : 'danny', salt : salt, hashed_pwd : hash, roles : ['admin']}),
			salt = createSalt();
			hash = hashPwd(salt, 'john');
			User.create({firstName : 'John', lastName : 'Doe', username : 'john', salt : salt, hashed_pwd : hash, roles : []}),
			salt = createSalt();
			hash = hashPwd(salt, 'jane');
			User.create({firstName : 'Jane', lastName : 'Doe', username : 'jane', salt : salt, hashed_pwd : hash})
		}
	});

	function createSalt () {
		return crypto.randomBytes(128).toString('base64');
	}

	function hashPwd (salt, pwd) {
		var hmac = crypto.createHmac('sha1', salt);
		return hmac.update(pwd).digest('hex');
	}

};