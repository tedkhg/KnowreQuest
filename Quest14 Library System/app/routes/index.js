var express = require('express');
var router = express.Router();
var db = require('../db');
var fs = require('fs');
var mysql = require('mysql');

var secret = JSON.parse(fs.readFileSync('./secret.json'));
var connection = mysql.createConnection(secret);

connection.connect(function(err) {
    if(err) {
        console.log("mysql connection error");
        console.log(err);
        throw err;
    } else {
        console.log("Say hello to mysql server!");
    }
})

router.get('/', function(req, res, next) {
	var query = "SELECT B.bid, B.title, B.publisher, GROUP_CONCAT(A.name SEPARATOR \', \') as author, IB.borrow, IB.id as borrower " +
				"FROM Author A, Books B " +
				"LEFT JOIN Info_author IA ON B.bid = IA.bid " +
				"LEFT JOIN (SELECT IB.bid, IB.isActive, IB.borrow, U.id FROM Info_borrow IB LEFT JOIN User U ON IB.uid = U.uid) IB ON B.bid = IB.bid AND IB.isActive = true " +
				"WHERE A.aid = IA.aid " +
				"GROUP BY B.title";
				console.log(query);
	var data = connection.query(query , function(err, rows) {
		console.log(rows);
    	res.render('index', {books: rows});
    })
})

router.get('/search', function(req, res, next) {
	var title = req.query.title;
	var author = req.query.author;
	var publisher = req.query.publisher;
	if(title) title = " AND B.title LIKE \'%" + title + "%\'";
	else title = "";
	if(author) author = " AND A.name LIKE \'%" + author + "%\'";
	else author = "";
	if(publisher) publisher = " AND B.publisher LIKE \'%" + publisher + "%\'";
	else publisher = "";
	var query = "SELECT B.bid, B.title, B.publisher, GROUP_CONCAT(A.name SEPARATOR \', \') as author, IB.borrow, IB.id as borrower " +
				"FROM Author A, Books B " +
				"LEFT JOIN Info_author IA ON B.bid = IA.bid " +
				"LEFT JOIN (SELECT IB.bid, IB.isActive, IB.borrow, U.id FROM Info_borrow IB LEFT JOIN User U ON IB.uid = U.uid) IB ON B.bid = IB.bid AND IB.isActive = true " +
				"WHERE A.aid = IA.aid" + title + author + publisher +
				" GROUP BY B.title";
				console.log(query);
	var data = connection.query(query , function(err, rows) {
		console.log(rows);
    	res.render('index', {books: rows});
    })
})

router.get('/history/:id', function(req, res, next) {
	var id = req.params.id;
	var query = "SELECT B.title, IB.borrow, IB.turnin, U.id FROM Books B, Info_borrow IB " +
				"LEFT JOIN User U ON U.uid = IB.uid " +
				"WHERE IB.bid = B.bid AND B.bid = " + id + " ORDER BY IB.id DESC";
				console.log(query);
	var data = connection.query(query, function(err, rows) { 
		console.log(rows);
		res.render('history', {history: rows, num: id});
	})
})

router.get('/borrow/:id', function(req, res, next) {
	var id = req.params.id;
	var query = "INSERT INTO Info_borrow (bid, uid) VALUES (" + id + ", 1)";

	var data = connection.query(query, function(err, rows) { 
		console.log(rows);
		res.redirect('back');
		res.end();
	})
})

router.get('/turnin/:id', function(req, res, next) {
	var id = req.params.id;
	var query = "UPDATE Info_borrow set isActive = false WHERE isActive = true AND bid = " + id;
	console.log(query);
	var data = connection.query(query, function(err, rows) { 
		if(err) throw err;
		console.log(rows);
		res.redirect('back');
		res.end();
	})
})

module.exports = router;
