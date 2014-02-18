var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');

userSchema = mongoose.Schema({
		firstName : {type : String, required : '{PATH} is required!'},
		lastName : {type : String, required : '{PATH} is required!'},
		username :  {
			type : String, 
			required : '{PATH} is required!',
			unique : true
		},
		salt : {type : String, required : '{PATH} is required!'},
		hashed_pwd : {type : String, required : '{PATH} is required!'},
		roles : [String]
	});

	userSchema.methods = {
		authenticate : function (passwordToMatch) {
			return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		},
		hasRole : function (role) {
			return this.roles.indexOf(role) > -1;
		}
	}

	User = mongoose.model('User', userSchema);

	function createDefaultUsers () {
		User.find({}).exec(function (error, collection) {
			if ( collection.length === 0 ) {
				var salt, hash;
				salt = encrypt.createSalt();
				hash = encrypt.hashPwd(salt, 'danny');
				User.create({firstName : 'Danny', lastName : 'Callaghan', username : 'danny', salt : salt, hashed_pwd : hash, roles : ['admin']}),
				salt = encrypt.createSalt();
				hash = encrypt.hashPwd(salt, 'john');
				User.create({firstName : 'John', lastName : 'Doe', username : 'john', salt : salt, hashed_pwd : hash, roles : []}),
				salt = encrypt.createSalt();
				hash = encrypt.hashPwd(salt, 'jane');
				User.create({firstName : 'Jane', lastName : 'Doe', username : 'jane', salt : salt, hashed_pwd : hash})
			}
		});
	}

	exports.createDefaultUsers = createDefaultUsers;