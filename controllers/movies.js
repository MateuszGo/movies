var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var bodyParser = require('body-parser');

router.get('/', (req, res) => {
	Movie.find({}).sort([['rating', 'descending']]).exec((err, movies) => {
		if (err){
			err.status = 503;
			return next(err);
		}else
		res.json(movies);
	});
});

router.delete('/:id', (req, res, next) => {
	Movie.remove({_id: req.params.id}, function(err){
		if (err){
			if (err.name == 'CastError'){
				err.status = 400;
				err.message = 'Improper id';
			}
			else
				err.status = 503;
			return next(err);
		} else
		res.status(204).json({});
	});
});

router.post('/', [bodyParser.urlencoded({extended: true}), bodyParser.json()], (req, res, next) => {
	var postBody = req.body;
	new Movie({title : postBody.title, rating : postBody.rating, director : postBody.director, actors : postBody.actors}).save(function(err, savedMovie){
		if (err){
			if (err.name == 'ValidationError')
				err.status = 400;
			else 
				err.status = 503;

			return next(err);
		} else {
			res.status(201).json(savedMovie);
		}
	});
});

router.use((err, req, res, next) => {
	res.status(err.status || 500);
	if (err.status == 503)
		err.message = 'Database maintenance';
	res.json({errorMessage: (err.message || 'Unknown error')});
});


module.exports = router;