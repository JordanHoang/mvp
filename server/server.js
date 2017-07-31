var express = require('express');

// middleware
var parser = require('body-parser');
var path = require('path');
var browserify = require('browserify-middleware');

// files
var router = require('./routes.js');
var config = require('../config.js')

// mongo and mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workoutLog');

var app = express();

// parse through requests
app.use(parser.json());


app.use('/', router);

app.get('/bundle.js', browserify('./client/index.js', {
	transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
}));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/styles.css', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../styles.css'));
});

// allow for cross origin requests
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type, accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

app.use(function(req, res, next) {
  res.status(404).send('404 - Page Not Found');
});

app.listen(8000, function() {
  console.log('Listening on port 8000');
});