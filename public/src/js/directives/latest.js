angular.module('recipeApp')
.directive('latest', function(){  //ingredients
	return {
		templateUrl: 'templates/latest.html',
		controller: 'mainCtrl',
		replace: true
	}
});
