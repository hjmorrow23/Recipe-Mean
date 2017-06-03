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