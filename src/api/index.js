'use strict';

//require express, model data, and a router
var express = require('express');
var Recipe = require('../models/recipe');
var router = express.Router();

//Get recipe data from API as JSON
router.get('/recipes', function(req, res) {
	Recipe.find({}, function(err, recipes) {
		if(err) {
			res.status(500).json({message: err.message});
		}
		res.json({recipes: recipes});
	});
	
});

//Post recipe data to API as JSON
router.post('/recipes', function(req, res) {
	var recipe = req.body;
	Recipe.create(recipe, function(err, recipe) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'recipe': recipe, message: "Recipe created"});
	});
	
});

//Put updated recipe data to API as JSON based on id
router.put('/recipes/:id', function(req, res) {
	var id = req.params.id;
	var recipe = req.body;
	if(recipe && recipe._id !== id) {
		return res.status(500).json({message: "Id's don't match!"});
	}
	Recipe.findByIdAndUpdate(id, recipe, {new: true}, function(err, recipe) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'recipe': recipe, message: "Recipe updated"});
	});
	
});

//Delete recipe data from API based on id
router.delete('/recipes/:id', function (req, res) {
    var id = req.params.id; 
    Recipe.findByIdAndRemove(id, function (err, result) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json({ message: 'Deleted Recipe' });
        }
    });
});


module.exports = router;