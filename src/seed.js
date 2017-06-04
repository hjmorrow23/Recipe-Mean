'use strict';

//require models data
var Recipe = require('./models/recipe.js');

//Preset seed recipe data
var recipes = [
	{
		name: "Peanut Butter Chocolate Chip Cookies",
		image: "/../public/img/cookies.jpeg",
		category: "Dessert",
		cookTime: "8 minutes",
		prepTime: "15 minutes",
		visible: true,
		ingrs: [
			{
				name: "Butter",
				quantity: "2 tbsp"
			},
			{
				name: "Sugar",
				quantity: "6 tbsp"
			},
			{
				name: "Brown Sugar",
				quantity: "6 tbsp"
			},
			{
				name: "Egg",
				quantity: "1"
			},
			{
				name: "Vanilla Extract",
				quantity: "1 tsp"
			},
			{
				name: "Baking Soda",
				quantity: "1/2 tsp"
			},
			{
				name: "Salt",
				quantity: "1/2 tsp"
			},
			{
				name: "Peanut Butter",
				quantity: "1 cup"
			},
			{
				name: "Flour",
				quantity: "3/4 cup"
			},
			{
				name: "Chocolate Chips",
				quantity: "3/4 cup"
			}
		],
		direcs: [
			"Preheat oven to 375 Degrees Farenheit.",
			"Cream butter, sugar and brown sugar in mixing bowl.",
			"Break egg into mixture and add vanilla extract. Mix well.",
			"Add peanut butter, baking soda and salt to mixture. Mix well.",
			"Add flour and chocolate to mixture. Mix well.",
			"Roll dough into balls about 2 inches thick and place on cookie sheet. Make an X pattern with a fork on top. Place in oven for 7-8 minutes.",
			"Let cool for about 5 minutes."
		]		
	}];

//Loop through recipes and find recipe by name aligning with mongoose schema
recipes.forEach(function(recipe, q, index) {
	Recipe.find({'name': recipe}, function(err, recipes){
		
		//If no data by that name exists, create it
		if(!err && !recipes.length) {
			Recipe.create({name: recipe});
		};
	});
});