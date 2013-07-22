/**
 * Module dependencies.
 */

var express = require('express')
	, http = require('http')
	, path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret : "sdfhoisduahf9832hrnf9832hnroinsdfj89ajfdosajf990",
	// set session timeout
	cookie : {
		path : '/',
		httpOnly : true,
		maxAge : 3600000
	}
}));
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// dispatch routes
var dispatcher = require("./dispatcher");
dispatcher.dispatch(app);

http.createServer(app).listen(process.env.PORT || 3000, function() {
	console.log("attendee listening on port %d in %s mode", process.env.PORT || 3000, app.settings.env);
});
