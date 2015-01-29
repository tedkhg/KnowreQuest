var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
	var query = 'select * from Books';
	var data = new db.DB(query, function(err, d) {
		console.log("hell");
	});

	
	console.log(data);

	console.log("nn");
	//res.render('index', {books: data});
});

module.exports = router;
