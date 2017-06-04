var angular = require('angular');

angular.module('recipeApp')
.directive('single', function(){  //directions
	return {
		templateUrl: 'templates/single.html',
		controller: 'mainCtrl',
		replace: true
	}
});