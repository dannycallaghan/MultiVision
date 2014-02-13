var express = require('express'),
	stylus = require('stylus'),
	mongoose = require('mongoose'),

	env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
	app = express(),
	port = process.env.PORT || 3030,

	db/*, messageSchema, Message, mongoMessage*/;

function compile (str, path) {
	return stylus(str).set('filename', path);
}

app.configure(function () {
	app.set('views', __dirname + '/server/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(stylus.middleware(
		{
			src: __dirname + '/public',
			compile: compile
		}
	));
	app.use(express.static(__dirname + '/public'));
});

if ( env === 'development' ) {
	mongoose.connect('mongodb://localhost/multivision');
} else {
	mongoose.connect('mongodb://dannycallaghan:multivision@ds027509.mongolab.com:27509/dannymultivision')
}

db = mongoose.connection;

db
	.on('error', console.error.bind(console, 'db connection error...'))
	.once('open', function callback () {
		console.log('db connection opened...');
	});

messageSchema = mongoose.Schema({message : String});
Message = mongoose.model('Message', messageSchema);
Message.findOne().exec(function (error, messageDoc) {
	mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (request, response) {
	response.render('partials/' + request.params.partialPath);
});

app.get('*', function (request, response) {
	response.render('index', {
		mongoMessage : mongoMessage
	});
});

app.listen(port);

console.log("Listening on port " + port + "...");