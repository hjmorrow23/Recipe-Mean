webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module("recipeApp")
.controller('mainCtrl', function($scope, dataService) {
	
	$scope.selected = "home";
	
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
	
	//Search function from dataService activated on ng-click in app
	$scope.searchRecipe = function(recipe) {
		dataService.searchRecipe(recipe);
	}
	
	$scope.selectRecipe = function(setSelection) {
		$scope.selected = setSelection;
	}
	
	//Selected in cookbook to display view
	$scope.isSelected = function(checkSelection) {
		return $scope.selected === checkSelection;
	}
});



/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('single', function(){  //directions
	return {
		templateUrl: 'templates/single.html',
		controller: 'mainCtrl',
		replace: true
	}
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

( function() {
	"use strict";

var angular = __webpack_require__(0);
var angular_route = __webpack_require__(1);

angular.module("recipeApp", ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/:id', {
        templateUrl: '../public/templates/single.html',
        controller: 'recipeCtrl'
      });
}])}
)();

__webpack_require__(2);
__webpack_require__(8);
__webpack_require__(4);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(3);
__webpack_require__(5);

/***/ })
],[9]);