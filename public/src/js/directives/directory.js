angular.module('recipeApp')
.directive('cookbook', function(){ 
	return {
		templateUrl: 'templates/cookbook.html',
		controller: 'mainCtrl',
		replace: true
	}
});
