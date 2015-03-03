var express = require('express');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');
var crypto = require('crypto');
var router = express.Router();
var passport = require('../passport');

var sess;

var secret = JSON.parse(fs.readFileSync('./secret.json'));
var connection = mysql.createConnection(secret[0]);

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
  sess = req.session;

  if(sess.account) {
  	hash = 'hello ' + sess.account;
  	birth = sess.birth;
  }
  else {
  	hash = "로그인을 해주세요.";
  	birth = '';
  }
  res.render('index', { hash : hash, birth : birth});
});

router.post('/login', function(req, res, next) {
  sess = req.session;
  console.log(req.body.account);
  console.log(req.body.pass);

  var shasum = crypto.createHash('sha1').update(req.body.pass);
  var p = shasum.digest('hex');
  console.log(p);
  var query = "SELECT account, pass, birth FROM userInfo WHERE account = \'" + req.body.account + "\';"
  console.log(query);
  var data = connection.query(query, function(err, rows) {
  	console.log(rows);
  	if(!rows[0]) {
  		res.redirect('/');
  	} else {
  		console.log(rows[0].pass);
	  	if(rows[0].pass == p) {
	  		sess.account = rows[0].account;
	  		sess.birth = rows[0].birth;
	  		res.redirect('/');
	  	} else {
	  		res.redirect('/');
	  	}
  	}
  })
});

router.get('/logout', function(req, res, next) {
	sess = req.session;

	sess.account = '';
	sess.birth = '';

	res.redirect('/');
})

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.me']}),
	function(req, res, next) {
});

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
	function(req, res, next) {
		res.redirect('/signup'); 
});

router.get('/signup', ensureAuthenticated, function(req, res, next) {
	var m = req.user.birthday.split('-')[1];
	var d = req.user.birthday.split('-')[2];
	res.render('signup', { msg : '', m : m, d : d });
});

router.post('/signup_ok', function(req, res, next) {
	console.log(req.body.account);
	console.log(req.body.pass);
	console.log(req.body.month);
	console.log(req.body.day);
	if(!req.body.account || !req.body.pass) {
		res.render('signup', { msg : '양식을 입력해주세요.', m : '', d : ''});
	} else {
		var shasum = crypto.createHash('sha1').update(req.body.pass);
  		var p = shasum.digest('hex');
		var birth = req.body.month + '-' + req.body.day;
		var query = "INSERT INTO userInfo (account, pass, birth) VALUES ('" +
			req.body.account + "', '" + p + "', '" + birth + "')";
		console.log(query);
  		var data = connection.query(query, function(err, rows) {
  			if(err) res.redirect('signup');
  			console.log(rows);
  			res.redirect('/');
  		})
  	}
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

module.exports = router;
