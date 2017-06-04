'use strict';

var angular = require('angular');

angular.module("recipeApp")
.service('dataService', function ($http, $q) {
	
	//Gets recipe data saved in API
	this.getRecipes = function(callback) { $http.get('api/recipes')
	.then(callback)
	};
	
	this.addIngr = function(recipes) {
		var ingr = { 
			name: "", 
			quantity: ""
		};
		recipes[0].ingrs.unshift(ingr);
	};
	
	this.addDirec = function(recipes) {
		var direc =  "";
		recipes[0].direcs.push(direc);
	};
	
	//Save funtion to save ingredient being added
	this.saveIngr = function(recipes) {
		var queue = [];
		
		//Loop through each recipe in recipes
		recipes.forEach(function(recipe) {
			var request;
			
			//post method for recipe if there is no id and put method if there is an id
			if(!recipe._id) {
				request = $http.post('/api/recipes', recipe.ingrs);
			} else {
				request = $http.put('/api/recipes/' + recipe._id, recipe).then(function(result) {
					recipe = result.data.recipe.ingrs;
					return recipe;
				});
			};
			
			//Push result to queue
			queue.push(request);
		});
	};
	
	//Save funtion to save direction step being added
	this.saveDirec = function(recipes) {
		var queue = [];
		
		//Loop through each recipe in recipes
		recipes.forEach(function(recipe) {
			var request;
			
			//post method for recipe if there is no id and put method if there is an id
			if(!recipe._id) {
				request = $http.post('/api/recipes', recipe.direcs);
			} else {
				request = $http.put('/api/recipes/' + recipe._id, recipe).then(function(result) {
					recipe = result.data.recipe.direcs;
					return recipe;
				});
			};
			
			//Push result to queue
			queue.push(request);
		});
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
/*
	this.deleteIngr = function(ingrs, $index) {
	    ingrs.splice(ingrs[this.$index], 1);
	};
*/
	
	//Log successful removal of direction step from direcs array
/*
	this.deleteDirec = function(direcs, $index) {
		direcs.splice(direcs[this.$index], 1);
	};
*/
	
	//TODO: Try making a save function for the specific input values being edited
	
	//Save the new or edited recipe to the API data 
	this.saveRecipe = function(recipes) {
		var queue = [];
		
		var newRecipe = {
			name: "",
			image: "http://lorempixel.com/400/200/food",
			category: "",
			cookTime: "",
			prepTime: "",
			visible: true,
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
		
		console.log(recipes);
	};
	
	//COOKBOOK PAGE SEARCH
	this.searchRecipe = function(recipes) {
		var input = document.getElementById("search-value").value;
		input = input.toUpperCase();
		recipes.forEach(function(recipe) {
			if (recipe.category.toUpperCase() == input || recipe.name.toUpperCase() == input || input == "" || recipe.name.toUpperCase().indexOf(input) >= 0) {
				recipe.visible = true;
			} else {
				recipe.visible = false;
			}
		});	
	}
	
	//COOKBOOK PAGE LINKING
	
	//on click, get recipe by index
	
	//generate single template with information based on recipe index
	
	//display page contents based on data and allow for editing	
});