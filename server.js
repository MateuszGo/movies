var express = require('express');
var dbConfig = require('./config/db');
var app = express();
var port = process.env.PORT || 3000; dfsdfds
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {useMongoClient: true});
var db = mongoose.connection;
var Movie = require('./models/movie');

db.on('error', console.error.bind(console, 'MongoDB error'));

var movies = require('./controllers/movies');

app.use('/movies', movies);

app.all('*', (req, res) => {
	res.status(404).json({"errorMessage" : "Resource does not exist"});
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});