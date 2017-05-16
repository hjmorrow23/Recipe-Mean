'use strict';

angular.module("recipeApp")
.service('dataService', function ($http) {
	
	this.getIngrs = function(callback) { $http.get('src/mock/ingrs.json')
	.then(callback)
	};
	
	this.getDirecs = function(callback) { $http.get('src/mock/direcs.json')
	.then(callback)
	};
	
	this.deleteIngr = function(ingr) {
		console.log("The " + ingr.name + " ingredient has been deleted!");
		// logic to delete this data from the database.
	};
	
	this.deleteDirec = function(direc) {
		console.log("The " + direc.name + " ingredient has been deleted!");
		// logic to delete this data from the database.
	};
	
	this.saveIngr = function(ingr) {
		console.log("The " + ingr.name + " ingredient has been saved!");
		// logic to save this data to the database.
	};
	
	this.saveDirec = function(direc) {
		console.log("The " + direc.name + " ingredient has been saved!");
		// logic to save this data to the database.
	};
});