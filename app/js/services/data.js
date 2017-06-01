'use strict';

var angular = require('angular');

angular.module("recipeApp")
.service('dataService', function ($http, $q) {
	
	//Gets recipe data saved in API
	this.getRecipes = function(callback) { $http.get('api/recipes')
	.then(callback)
	};
	
	//Delete function to remove full recipe from the API data
	this.deleteRecipe = function(recipe) {
		
		//If no recipe id found, resolve
		if (!recipe._id) {
	        return $q.resolve();
	    }
	    
	    //Return the request to delete the recipe from API based on id and log success statement to console.
	    return $http.delete('/api/recipes/' + recipe._id).then(function () {
	        console.log("I deleted the " + recipe.name + " ingredient!"); 
	    });
	};
	
	//Log successful removal of ingredient from ingrs array
	this.deleteIngr = function(ingr) {
	    console.log("I deleted the " + ingr.name + " ingredient!"); 
	};
	
	//Log successful removal of direction step from direcs array
	this.deleteDirec = function(direc) {
		console.log("The " + direc.name + " ingredient has been deleted!");
	};
	
	//Save the new or edited recipe to the API data
	this.saveRecipe = function(recipes) {
		var queue = [];
		
		//Loop through each recipe in recipes
		recipes.forEach(function(recipe) {
			var request;
			
			//post method for recipe if there is no id and put method if there is an id
			if(!recipe._id) {
				request = $http.post('/api/recipes', recipe);
			} else {
				request = $http.put('/api/recipes/' + recipe._id, recipe).then(function(result) {
					recipe = result.data.recipe;
					return recipe;
				});
			};
			
			//Push result to queue
			queue.push(request);
		});
		
		//return queue to api
		return $q.all(queue).then(function(results) {
			console.log("I saved " + recipes.length + " ingredients!");
		});
		
		var newRecipe = {
			name: "",
			image: "",
			category: "",
			cookTime: "",
			prepTime: "",
			ingrs: [
				{
					name: "",
					quantity: ""
				}
			],
			direcs: [
				""
			]		
		};
		
		recipes.unshift(newRecipe);
	};
	
	//TODO: Add new recipe to end of recipes with the same keys, but no data
	
});