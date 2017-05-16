'use strict';

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
		$scope.ingrs = response.data;
	});
	
	dataService.getDirecs(function(response) {
		console.log(response.data);
		$scope.direcs = response.data;
	});
	
	$scope.deleteIngr = function(ingr, $index) {
		dataService.deleteIngr(ingr);
		$scope.ingrs.splice($index, 1);
	}
	
	$scope.deleteDirec = function(direc, $index) {
		dataService.deleteDirec(direc);
		$scope.direcs.splice($index, 1);
	}
	
	$scope.saveIngr = function(ingr) {
		dataService.saveIngr(ingr);
	}
	
	$scope.saveDirec = function(direc) {
		dataService.saveIngr(direc);
	}
});
