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

function loadList(req, res, data) {
	console.log("handler 'loadList'");
	fs.readdir('./notes', function(err, list) {
		if(err) throw err;

		var content = "";
		for(var i = 0; list[i]; i++) {
			content += '<li class="file">' + list[i] + '</li>';
			console.log(list[i]);
		}
		
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(content);
		res.end();
	})

	// exec("dir notes", function(error, stdout, stderr) {
	// 	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
	// 	res.write(stdout[7]);
	// 	res.end();
	// })
}

function loadFile(req, res, data) {
	data = data.split('=')[1];
	console.log("handler 'loadFile'");
	fs.readFile('./notes/' + data, function(err, content) {
		if(err) {
			console.log("No file named " + data);
			return;
		}

		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(content);
		res.end();
	})
}

function saveFile(req, res, data) {
	console.log("handler 'saveFile'");
	var name = data.split('&')[0].split('=')[1]
	var content = data.split('&')[1].split('=')[1]
	console.log(name);
	console.log(content);

	fs.writeFile('./notes/' + name, content, 'utf8', function(err) {
		if(err) throw err;
		console.log("write end");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('');
		res.end();
	})
}

function deleteFile(req, res, data) {
	console.log("handler 'deleteFile'");
	var name = data.split('=')[1]

	fs.unlink('./notes/' + name, function(err) {
		if(err) throw err;

		console.log("delete end");
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('');
		res.end();
	})	
}

exports.start = start;
exports.loadList = loadList;
exports.loadFile = loadFile;
exports.saveFile = saveFile;
exports.deleteFile = deleteFile;