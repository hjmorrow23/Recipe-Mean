'use strict';

var angular = require('angular');

angular.module("recipeApp")
.service('dataService', function ($http, $q) {
	
	//Gets recipe data saved in API
	this.getRecipes = function(callback) { $http.get('api/recipes')
	.then(callback)
	};
	
	this.checkUrl = function(recipes) {
		var currentUrl = window.location.href;
		var splitUrl = currentUrl.split("/");
		var currentId = splitUrl[splitUrl.length - 1];
		
		for(var i = 0; i < recipes.length; i++) {	
			if(recipes[i]._id === currentId) {
				return "recipes" + recipes[i];
			}
		};
	}
	
	this.addIngr = function(recipes) {		
		var newIngr = { 
			name: "", 
			quantity: ""
		};

		recipes[0].ingrs.unshift(newIngr);
	};
	
	this.addDirec = function(recipes) {
// 		var newDirec =  "";
		
		recipes[0].direcs.push("");
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
		
		recipes.unshift(newRecipe);
		
		//return queue to api
		return $q.all(queue).then(function(results) {
			console.log("I saved " + recipes.length + " recipes!");
		});
		
		
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