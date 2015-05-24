var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
// io object is a socket.io server
// and an instance of EventEmitter
var io = socket_io(server); 
var totalClients = 0;

io.on('connection', function(socket) {
	console.log('Client connected');
	io.emit('users', ++totalClients);
	socket.broadcast.emit('joinleave', 'someone joined');
	socket.nickname = '';

	socket.on('message', function(message) {
		console.log('Received message:', message);
		//send message to all clients except socket in use
		socket.broadcast.emit('message', message);
	});

	socket.on('set-nickname', function(nickname) {
		console.log(nickname + ' nickname set');
		this.nickname = nickname;
	});

	socket.on('disconnect', function() {
		var who = this.nickname == '' ? 'someone' : this.nickname; 
		console.log(who + ' disconnected');
		io.emit('users', --totalClients);
		io.emit('joinleave', who + ' left...');
	});
});

server.listen(8080);