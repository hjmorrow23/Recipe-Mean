angular.module('recipeApp')
.directive('direcs', function(){  //directions
	return {
		templateUrl: 'templates/direcs.html',
		controller: 'mainCtrl',
		replace: true
	}
});