var io = require('socket.io')();

io.on('connection', function(socket) {
	console.log("a user connected.");
	socket.broadcast.emit('new user');

	socket.on('disconnect', function() {
		console.log("user disconnected.");
	})

	socket.on('create', function(cid,type) {
		console.log(cid);
		console.log(type);
		socket.broadcast.emit('create', cid, type);
	});

	socket.on('init', function(cid, arr) {
		console.log('get id:' + cid);
		console.log(arr);
		socket.broadcast.emit('init', cid, arr);
	})

	socket.on('move', function(cid, type) {
		socket.broadcast.emit('move', cid, type);
	})

	socket.on('mouse', function(cid, dl, dt, dw, dh) {
		socket.broadcast.emit('mouse', cid, dl, dt, dw, dh);
	})
})

module.exports = io;
// module.exports.curr = currentUser;