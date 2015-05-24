var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server); 
// io object is a socket.io server
// and an instance of EventEmitter

io.on('connection', function(socket) {
	console.log('Client connected');

	socket.on('message', function(message) {
		console.log('Received message:', message);
		//send message to all clients except socket in use
		socket.broadcast.emit('message', message);
	});
});

server.listen(8080);