$(document).ready(function() {
	//create 'Manager' object which
	//automaticaly connects to server
	var socket = io();

	//use jQuery to select the <input> tag
	var input = $('#message-box');
	var nicknameInput = $('#nickname-box');
	//use jQuery to select the <div> tag with id=messages
	//does hash (#) denote id?
	var messages = $('#messages');
	var users = $('#users');
	var nickname;

	var addMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var joinLeave = function(message) {
		messages.append('<div><i>' + message + '</i></div>');
	};

	var updateUserCount = function(userCount) {
		users.text(userCount);
	};

	//adds a 'listener' named keydown to the input tag
	input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		var message = input.val();
		addMessage(message); //add <div>message</div> to #message div\
		socket.emit('message', nickname + ': ' + message);
		input.val(''); //clear input field
	});

	nicknameInput.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		nickname = nicknameInput.val();
		socket.emit('set-nickname', nickname);
	});

	socket.on('message', addMessage);
	socket.on('joinleave', joinLeave);
	socket.on('users', updateUserCount);
})