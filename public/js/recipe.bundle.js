webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
	$scope.addIngr = function() {
		var ingr = { 
			name: "Name", 
			quantity: "Quantity"
		};
		$scope.ingrs.unshift(ingr); //adds new ingredient to beginning of the array
	}
	
	//Adds a new input of a direction step that can be added to your recipe
	$scope.addDirec = function() {
		var direc =  "Next step";
		$scope.direcs.push(direc); //adds new ingredient to end of the array
	}
	
	//Delete specific ingredient data piece from the array
	$scope.deleteIngr = function(ingr, $index) {
		dataService.deleteIngr(ingr);
		$scope.ingrs.splice($index, 1);
	}
	
	//Delete specific ingredient data piece from the array
	$scope.deleteDirec = function(direc, $index) {
		dataService.deleteDirec(direc);
		$scope.direcs.splice($index, 1);
	}
	
	//Saves the recipe based on save function in dataService
	$scope.saveRecipe = function(recipe) {
		dataService.saveRecipe(recipe);
	}
});



/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('cookbook', function(){ 
	return {
		templateUrl: 'templates/cookbook.html',
		controller: 'mainCtrl',
		replace: true
	}
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('ingrs', function(){  //ingredients
	return {
		templateUrl: 'templates/ingrs.html',
		controller: 'mainCtrl',
		replace: true
	}
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('latest', function(){  //ingredients
	return {
		templateUrl: 'templates/latest.html',
		controller: 'mainCtrl',
		replace: true
	}
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('new', function(){  //directions
	return {
		templateUrl: 'templates/new.html',
		controller: 'mainCtrl',
		replace: true
	}
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module("recipeApp", []);

__webpack_require__(1);
__webpack_require__(6);
__webpack_require__(3);
__webpack_require__(5);
__webpack_require__(2);
__webpack_require__(4);

/***/ })
],[7]);