#!/usr/bin/env node
/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var express  = require('express'),
	http     = require('http'),
	path     = require('path'),
	stylus   = require('stylus'),
	nib      = require('nib'),
	routes   = require('./routes.js'),
	app      = express();

/**
 * Render Configuration.
 */
function render(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib());
}
app.set('views', __dirname + '/presentation/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({ src: __dirname + '/presentation/public', compile: render }));

/**
 * Express Configuration.
 */
app.set('port', process.env.PORT || 4000);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, '/presentation/public')));
routes(app);

/**
 * Development only.
 */
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

/**
 * Start Server.
 */
http.createServer(app).listen(app.get('port'), function(){
	console.log('Workshop Jquery em http://localhost:' + app.get('port'));
});
