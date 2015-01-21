var querystring = require('querystring'),
	http = require("http"),
	url = require("url");

function start(route, handle) {
	function onRequest(req, res) {
		var req_url = url.parse(req.url);
		var pathname = req_url.pathname;
		// console.log(req_url);
		// console.log(pathname);

		if(req.method == 'POST') {
			console.log("POST");
			var postData = "";

			req.setEncoding("utf8");

			req.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				console.log("received data : " + postDataChunk);
			})

			req.addListener("end", function() {
				//postData = querystring.parse(postData).text;
				console.log(postData);
				route(handle, pathname, res, req, postData);
			})
		} else if(req.method == "GET") {
			var query = req_url.query;
			console.log("GET");

			route(handle, pathname, res, req, query);
		} else {
			console.log("not defined method.");
		}
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");
}

exports.start = start;
