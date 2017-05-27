'use strict';

var Ingr = require('./models/ingr.js');

var ingrs = [{
	"name": "sugar",
	"quantity": "1 tsp"
	},
	{
	"name": "spice",
	"quantity": "1 tsp"
	},
	{
	"name": "everything nice",
	"quantity": "1 tsp"
}];

ingrs.forEach(function(ingr, q, index) {
	Ingr.find({'name': ingr}, function(err, ingrs){
		if(!err && !ingrs.length) {
			Ingr.create({name: ingr});
		};
	});
});