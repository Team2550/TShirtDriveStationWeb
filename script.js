const INTERVAL_LENGTH = 1000;
var gamepads = [];

window.addEventListener("gamepadconnected", function(e) {
	console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
		e.gamepad.index, e.gamepad.id,
		e.gamepad.buttons.length, e.gamepad.axes.length);
	if(gamepads[0] == null) {
		gamepads[0] = navigator.getGamepads()[e.gamepad.index];
		console.log("Gamepad 1 added");
	}
	else if(gamepads[1] == null) {
		console.log("Gamepad 2 added");
		gamepads[1] = navigator.getGamepads()[e.gamepad.index];
		setTimeout(update, INTERVAL_LENGTH);
	}
	else
		console.log("Additional gamepad added. Why?");

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

	console.log("Ending update loop");
	setTimeout(update, INTERVAL_LENGTH);
}
