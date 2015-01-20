var querystring = require('querystring'),
	http = require("http"),
	url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var req_url = url.parse(request.url);
		var pathname = req_url.pathname;
		console.log("Request for " + pathname + " received.");

		if(request.method == 'POST') {
			console.log("POST");
			var postData = "";

			request.setEncoding("utf8");

			request.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				console.log("Received POST data chunk '" + postDataChunk + "'.");
			});

			request.addListener("end", function() {
				postData = querystring.parse(postData).text;
				route(handle, pathname, response, postData);
			});
		} else {
			var query = req_url.query;
			console.log(query);

			route(handle, pathname, response, query);
		}
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server has started.");	
}

exports.start = start;