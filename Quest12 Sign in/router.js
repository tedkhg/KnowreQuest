var fs = require("fs");

function route(handle, pathname, res, req, data) {
	console.log("Route : " + pathname);
	console.log(req.url);

	if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.css'

      fs.readFile('./' + pathname, function (err, d) {
        if (err) console.log(err);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(d);
        res.end();
      });

    }
	else if(typeof handle[pathname] === 'function') {
		handle[pathname](req, res, data);
	}
	else {
		console.log("No request handler for " + pathname);
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not found");
		res.end();
	}
}

exports.route = route;