'use strict';

var mongoose = require('mongoose');

var ingrSchema = new mongoose.Schema({
	name: String,
	quantity: String
});

var model = mongoose.model('Ingr', ingrSchema);

module.exports = model;