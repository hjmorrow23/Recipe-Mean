'use strict';

var angular = require('angular');

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