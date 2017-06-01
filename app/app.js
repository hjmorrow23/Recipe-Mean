"use strict";

var angular = require('angular');

angular.module("recipeApp", []);

require('./js/controllers/main.js');
require('./js/services/data.js');
require('./js/directives/ingrs.js');
require('./js/directives/new.js');
require('./js/directives/directory.js');
require('./js/directives/latest.js');