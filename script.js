// NOTES:
// Figure out which axis is the Y axis. Then use the Y axis from each controller to implement tank drive. If I remember right, the values -1 to 1 should be mapped to the integers -128 and 127.
// Also, figure out how to make HTTP requests from Javascript. It's probably pretty easy, given Javascript's intended purpose.

const INTERVAL_LENGTH = 1000; // the length of time (in milliseconds) between controller updates. 1000 is good for debugging; 50 or 100 should be used for production.
var gamepads = [];
const PI_ADDRESS = "http://localhost:5000" // The address to the PI. CHANGE THIS!!! Or, even better, make it a textbox on the webpage

window.addEventListener("gamepadconnected", function(e) {
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		e.gamepad.index, e.gamepad.id,
		e.gamepad.buttons.length, e.gamepad.axes.length);
	if(gamepads[0] == null) {
		gamepads[0] = navigator.getGamepads()[e.gamepad.index];
		console.log("Gamepad 1 added (add one more to enable controls)");
	}
	else if(gamepads[1] == null) {
		console.log("Gamepad 2 added");
		gamepads[1] = navigator.getGamepads()[e.gamepad.index];
		setTimeout(update, INTERVAL_LENGTH);
	}
	else
		console.log("Additional gamepad added. Why? You only need two. Ignoring...");

});

function update() {
	console.log("Running update loop");

	for(var conNum = 0; conNum < 2; ++conNum) {
		for(var i = 0; i < gamepads[conNum].buttons.length; ++i) {
			if(gamepads[conNum].buttons[i].pressed) {
				console.log("Button %d pressed on controller %d", i+1, conNum+1);
			}
		}

		for(var i = 0; i < gamepads[conNum].axes.length; ++i) {
			console.log("Axis %d is at %f on controller %d", i, gamepads[conNum].axes[i], conNum+1);
		}

	}

	// Process the data
	var leftSide = -1 * (gamepads[0].axes[1]);
	leftSide = Math.round(leftSide * 127);
	var rightSide = -1 * (gamepads[1].axes[1]);
	rightSide = Math.round(rightSide * 127);

	// Prepare the URI
	var uri = PI_ADDRESS + "/tankdrive?left=" + leftSide + "&right=" + rightSide;

	// Send the data
	var request = new XMLHttpRequest()
	request.open("GET", uri, true);
	request.onload = function() {
		// We don't use the response. Hence this empty function
		// I don't even know if I need to put this function here; maybe
		// javascript would ignore it if it didn't exist?
	}
	request.send(); // DO IT

	console.log("Ending update loop");
	setTimeout(update, INTERVAL_LENGTH);
}
