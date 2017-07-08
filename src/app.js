'use strict';

//Requirements
var express = require('express');
var parser = require('body-parser');
var router = require('./api');

var app = express();

//Pull in Database and Seed Data
require('./database');
require('./seed');

//Determine where application lives and establish parser
app.use('/', express.static('public'));
app.use(parser.json());

//Connect API
app.use("/api", router);

//App listen port and start confirmation
app.listen(3000, function() {
	console.log("The server is running on port 3000");
});