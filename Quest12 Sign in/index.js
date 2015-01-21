var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/loadCookie"] = requestHandlers.loadCookie;
handle["/login"] = requestHandlers.login;

server.start(router.route, handle);