var querystring = require("querystring"),
	fs = require("fs");

function start(req, res, data) {
	console.log("handler 'start'");
	fs.readFile('./index.html', function(err, html) {
		if(err) throw err;

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	})
}

function loadCookie(req, res, data) {
	console.log("handler 'loadCookie'");
	console.log(req.headers.cookie);

	res.writeHead(200, {"Content-Type": "text/html"});
	if(!req.headers.cookie) {
		var content = '<form>ID: <input type="text" name="id"><br>' +
					'PW: <input type="password" name="pw"><br></form>' +
					'<button id="login" onclick=login()>login</button>';
		res.write('로그인 해주세요.//' + content);
	} else {
		var name = req.headers.cookie.split('=')[1];
		var content = '<button id="logout">logout</button>';
		res.write(name + '!//' + content);
	}
	res.end();
}

function login(req, res, data) {
	console.log("handler 'login'");
	var id = data.split('&')[0].split('=')[1];
	var pw = data.split('&')[1].split('=')[1];

	if(id == "admin" && pw == "1234") {
	} else if(id == "kurt" && pw == "1234") {
	} else if(id == "ted" && pw == "1234") {
	} else {
		res.writeHead(404);
		res.write("");
		res.end();
		return;
	}

	var now = new Date().getTime() + 1000*5;
	res.writeHead(200, {
		"Content-Type": "text/html",
		"Set-Cookie": [
			'name = '+ id
		]
	});
	res.end();
}

exports.start = start;
exports.loadCookie = loadCookie;
exports.login = login;