$(document).ready(function() {
	//use jQuery to select the <input> tag
	var input = $('input');
	//use jQuery to select the <div> tag with id=messages
	//does hash (#) denote id?
	var messages = $('#messages');

	var addMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	//adds a 'listener' named keydown to the input tag
	input.on('keydown', function(event) {
		if (event.keyCode != 13) {
			return;
		}

		var message = input.val();
		addMessage(message); //add <div>message</div> to #message div
		input.val(''); //clear input field
	});
})