webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var angular = __webpack_require__(0);

angular.module("recipeApp")
.controller('mainCtrl', function($scope, dataService) {
	
	$scope.addIngr = function() {
		var ingr = { 
			name: "ex Butter", 
			quantity: "ex 2 tbsp"
		};
		$scope.ingrs.unshift(ingr); //use ingrs.push to add to end of list 
	}
	
	$scope.addDirec = function() {
		var direc = {
			step: "ex Stir for 2 hours on low heat"
		};
		$scope.direcs.push(direc);
	}
	
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
	
	dataService.getIngrs(function(response) {
		console.log(response.data);
		$scope.ingrs = response.data.ingrs;
	});
	
	dataService.getDirecs(function(response) {
		console.log(response.data);
		$scope.direcs = response.data;
	});
	
	$scope.deleteIngr = function(ingr, $index) {
		dataService.deleteIngr(ingr).then(function () {
        	$scope.ingrs.splice($index, 1);
		});
	}
	
	$scope.deleteDirec = function(direc, $index) {
		dataService.deleteDirec(direc);
		$scope.direcs.splice($index, 1);
	}
	
	$scope.saveIngr = function(ingrs) {
		dataService.saveIngr(ingrs);
	}
	
	$scope.saveDirec = function(direc) {
		dataService.saveIngr(direc);
	}
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var angular = __webpack_require__(0);

angular.module('recipeApp')
.directive('direcs', function(){  //directions
	return {
		templateUrl: 'templates/direcs.html',
		controller: 'mainCtrl',
		replace: true
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

"use strict";


var angular = __webpack_require__(0);

angular.module("recipeApp")
.service('dataService', function ($http, $q) {
	
	this.getIngrs = function(callback) { $http.get('api/ingredients')
	.then(callback)
	};
	
	this.getDirecs = function(callback) { $http.get('src/mock/direcs.json')
	.then(callback)
	};
	
	this.deleteIngr = function(ingr) {
		if (!ingr._id) {
	        return $q.resolve();
	    }
	    return $http.delete('/api/ingredients/' + ingr._id).then(function () {
	        console.log("I deleted the " + ingr.name + " ingredient!"); 
	    });
		// logic to delete this data from the database.
	};
	
	this.deleteDirec = function(direc) {
		console.log("The " + direc.name + " ingredient has been deleted!");
		// logic to delete this data from the database.
	};
	
	this.saveIngr = function(ingrs) {
		var queue = [];
		ingrs.forEach(function(ingr) {
			var request;
			if(!ingr._id) {
				request = $http.post('/api/ingredients', ingr)
			} else {
				request = $http.put('/api/ingredients/' + ingr._id, ingr).then(function(result) {
					ingr = result.data.ingr;
					return ingr;
				});
			};
			queue.push(request);
		});
		return $q.all(queue).then(function(results) {
			console.log("I saved " + ingrs.length + " ingredients!");
		});
		console.log("The " + direc.name + " ingredient has been saved!");
		// logic to save this data to the database.
	};
	
	this.saveDirec = function(direc) {
		console.log("The " + direc.name + " ingredient has been saved!");
		// logic to save this data to the database.
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
__webpack_require__(4);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(5);

/***/ })
],[7]);