'use strict';

var express = require('express');
var Ingr = require('../models/ingr');
// var ingrs = require('../../mock/ingrs.json');
var router = express.Router();

router.get('/ingredients', function(req, res) {
	Ingr.find({}, function(err, ingrs) {
		if(err) {
			res.status(500).json({message: err.message});
		}
		res.json({ingrs: ingrs});
	});
	
});

router.post('/ingredients', function(req, res) {
	var ingr = req.body;
	Ingr.create(ingr, function(err, ingr) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'ingr': ingr, message: "Ingredient created"});
	});
	
});

router.put('/ingredients/:id', function(req, res) {
	var id = req.params.id;
	var ingr = req.body;
	if(ingr && ingr._id !== id) {
		return res.status(500).json({message: "Id's don't match!"});
	}
	Ingr.findByIdAndUpdate(id, ingr, {new: true}, function(err, ingr) {
		if(err) {
			return res.status(500).json({message: err.message});
		}
		res.json({'ingr': ingr, message: "Ingredient updated"});
	});
	
});

router.delete('/ingredients/:id', function (req, res) {
    var id = req.params.id; 
    Ingr.findByIdAndRemove(id, function (err, result) {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.json({ message: 'Deleted Todo' });
        }
    });
});


module.exports = router;