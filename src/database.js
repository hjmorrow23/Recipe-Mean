'use strict';

var mongoose = require('mongoose');

//Database connections
mongoose.connect('mongodb://localhost/recipe-mean', function(err) {
	if(err){
		console.log('Failed to connect to MongoDB!');
	} else {
		console.log('Successfully connected to MongoDB!');
	}
});