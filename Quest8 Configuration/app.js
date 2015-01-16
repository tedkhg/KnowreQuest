var fs = require("fs");

var num = process.argv[2];

fs.readFile('./config' + num + '.js', 'binary', function(error, file) {
	process.stdout.write(file);
});