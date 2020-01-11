 "use strict";
 var express = require("express"),
 	bodyParser = require("body-parser"),
 	methodOverride = require("method-override");

 module.exports = function () {
 	var app = express();
 	app.use(bodyParser.urlencoded({
		 extended: true,
		 limit: '50mb'
 	}));

 	app.use(bodyParser.json({limit: '50mb'}));
 	app.use(methodOverride());
 	app.use(function (req, res, next) {

	//var allowedOrigins = ['http://bizopsai.tech','http://www.bizopsai.tech','http://localhost:4200'];
	var allowedOrigins = ['http://localhost:4202'];
	var origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) > -1){
		res.setHeader('Access-Control-Allow-Origin', origin);
	}		
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Credentials', true);
	next();
 	});

 	app.use(express.static("./public"));
	  require("../Router/test.server.route")(app);
 	return app;
 };