'use strict';

angular.module("recipeApp")
.controller('recipeCtrl', function($scope, dataService) {
	//Gets Recipes from API and indentifies the recipe, ingredients, and directions to be edited in the app
	dataService.getRecipes(function(response) {
		console.log(response.data);
		$scope.recipes = response.data.recipes;
		for(var i = 0; i < $scope.recipes.length; i++) {
			$scope.ingrs = $scope.recipes[i].ingrs;
			$scope.direcs = $scope.recipes[i].direcs;
		}
	});
	
	$scope.checkUrl = function(recipe) {
		dataService.checkUrl(recipe);
	}
}