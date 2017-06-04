'use strict';

//require mongoose
var mongoose = require('mongoose');

//set new mongoose schema based on data structure for recipes
var recipeSchema = new mongoose.Schema({
		name: String,
		image: String,
		category: String,
		cookTime: String,
		prepTime: String,
		visible: Boolean,
		ingrs: [
			{
				name: String,
				quantity: String
			}
		],
		direcs: [ String ]
});

var model = mongoose.model('Recipe', recipeSchema);

module.exports = model;