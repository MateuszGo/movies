var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var bodyParser = require('body-parser');

router.get('/', (req, res) => {
	Movie.find({}).sort([['rating', 'descending']]).exec((err, movies) => {
		if (err)
			res.status(503).json({errorType: 'database', message: err.message});
		else
			res.json(movies);
	})
})

router.delete('/:id', (req, res) => {
	Movie.remove({_id: req.params.id}, function(err){
		if (err)
			if (err.name == 'CastError')
				res.status(400).json({errorType: 'input data', message: 'Improper id'});
			else
				res.status(503).json({errorType: 'database', message: err.message});
		else
			res.status(204).json({});
	})
})

router.post('/', bodyParser.urlencoded({extended: true}), (req, res, next) => {
	var postBody = req.body;
	new Movie({title : postBody.title, rating : postBody.rating, director : postBody.director, actors : postBody.actors}).save(function(err, savedMovie){
		if (err){
			if (err.name == 'ValidationError')
				res.status(400).json({errorType: 'input data', message: err.message});
			else 
				res.status(503).json({errorType: 'database', message: err.message});
		} else {
			res.status(201).json(savedMovie);
		}
	});
})


module.exports = router;