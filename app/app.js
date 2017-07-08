( function() {
	"use strict";

var angular = require('angular');
var angular_route = require('angular-route');

angular.module("recipeApp", ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
      $routeProvider
      .when('/:id', {
        templateUrl: '../public/templates/single.html',
        controller: 'recipeCtrl'
      });
}])}
)();

require('./js/controllers/main.js');
require('./js/services/data.js');
require('./js/directives/ingrs.js');
require('./js/directives/new.js');
require('./js/directives/single.js');
require('./js/directives/directory.js');
require('./js/directives/latest.js');