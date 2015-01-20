var querystring = require("querystring"),
	fs = require("fs");

function start(response, Data) {
	console.log("Request handler 'start' was called.");
	var content = "";
	if(!Data) 
		content = 'Hello World!';
	else 
		content = Data;

	var body = '<html>'+
	    '<head>'+
	    '<meta http-equiv="Content-Type" content="text/html; '+
	    'charset=UTF-8" />'+
	    '</head>'+
	    '<body>'+
	    '<p>'+content+'</p>'+
	    '<form action="/" method="post">'+
	    '<textarea name="text" rows="10" cols="30"/>input text here!</textarea>'+
	    '<input type="submit" value="Post text" />'+
	    '</form>'+
	    '</body>'+
	    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

exports.start = start;