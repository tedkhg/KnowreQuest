var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {}
handle["/"] = requestHandler.start;
handle["/loadList"] = requestHandler.loadList;
handle["/loadFile"] = requestHandler.loadFile;
handle["/saveFile"] = requestHandler.saveFile;
handle["/deleteFile"] = requestHandler.deleteFile;

server.start(router.route, handle);