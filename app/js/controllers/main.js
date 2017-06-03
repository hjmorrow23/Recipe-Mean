'use strict';

angular.module("recipeApp")
.controller('mainCtrl', function($scope, dataService) {
	
	//Interaction to switch out active div to display on page on link click
	$scope.slideShift = function(daClass) {
		var slideIn = document.querySelector('.' + daClass + '');
		var slideOut = document.querySelector('.active');
		if (slideIn.classList.contains('inactive')) {
			slideOut.classList.remove('active');
			slideOut.classList.add('inactive');
			slideIn.classList.remove('inactive');
			slideIn.classList.add('active');
		}
	}
	
	//Gets Recipes from API and indentifies the recipe, ingredients, and directions to be edited in the app
	dataService.getRecipes(function(response) {
		console.log(response.data);
		$scope.recipes = response.data.recipes;
		for(var i = 0; i < $scope.recipes.length; i++) {
			$scope.ingrs = $scope.recipes[i].ingrs;
			$scope.direcs = $scope.recipes[i].direcs;
		}
		
		//check to make sure ingredient and direction data is being pulled correctly
		console.log($scope.ingrs);
		console.log($scope.direcs);
	});
	
	//Adds a new input of an ingredient that can be added to your recipe
	$scope.addIngr = function(recipe) {
		dataService.addIngr(recipe);
	}
	
	//Adds a new input of a direction step that can be added to your recipe
	$scope.addDirec = function(recipe) {
		dataService.addDirec(recipe);
	}
	
	//Save Ingredient being entered
	$scope.saveIngr = function(recipe) {
		dataService.saveIngr(recipe);
	}
	//Save Direction being entered
	$scope.saveDirec = function(recipe) {
		dataService.saveDirec(recipe);
	}
	
	//Delete specific ingredient data piece from the array
	$scope.deleteIngr = function(ingr, $index) {
		$scope.ingrs.splice($index, 1);
	}
	
	//Delete specific ingredient data piece from the array
	$scope.deleteDirec = function(direc, $index) {
		$scope.direcs.splice($index, 1);
	}
	
	//Delete recipe from recipes array
	$scope.deleteRecipe = function(recipe, $index) {
		dataService.deleteRecipe(recipe, $index);
	}
	
	//Saves the recipe based on save function in dataService
	$scope.saveRecipe = function(recipe) {
		dataService.saveRecipe(recipe);
	}
});

