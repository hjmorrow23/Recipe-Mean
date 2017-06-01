var angular = require('angular');

angular.module('recipeApp')
.directive('new', function(){  //directions
	return {
		templateUrl: 'templates/new.html',
		controller: 'mainCtrl',
		replace: true
	}
});