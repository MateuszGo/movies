var express = require('express');
var dbConfig = require('./config/db');
var app = express();
const port = 3000;
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url, {useMongoClient: true});
var db = mongoose.connection;
var Movie = require('./models/movie');

db.on('error', console.error.bind(console, 'MongoDB error'));

var movies = require('./controllers/movies');

app.use('/movies', movies);

app.listen(port, () => {
	console.log('Listening on port ' + port);
});