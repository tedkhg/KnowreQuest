var fs = require('fs');
var mysql = require('mysql');
var data;

var DB = function(query) {
	var secret = JSON.parse(fs.readFileSync('./secret.json'));
	var connection = mysql.createConnection(secret);

	return connection.connect(function(err) {
	    if(err) {
	        console.log("mysql connection error");
	        console.log(err);
	        throw err;
	    } else {
	        console.log("Say hello to mysql server!");
	        connection.query(query, function(err, rows) {
	        	console.log("success to query : " + query);
	        	console.log(rows);
	        	return rows;
	        })
	    }
	})
}

exports.DB = DB;