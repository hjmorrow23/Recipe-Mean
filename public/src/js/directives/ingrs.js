angular.module('recipeApp')
.directive('ingrs', function(){  //ingredients
	return {
		templateUrl: 'templates/ingrs.html',
		controller: 'mainCtrl',
		replace: true
	}
});
