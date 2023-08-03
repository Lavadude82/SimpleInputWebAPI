var mouse = {
    x: 0,
    y: 0,
    left: false,
    right: false,
    middle: false,
    scroll: 0,
    lastScroll: window.scrollX,
};
var keys = {};
onkeyup = onkeydown = function (e) {
    keys[e.keyCode] = e.type == "keydown";
};
onmousemove = function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
};
onmousedown = onmouseup = function (e) {
    mouse.left = e.button == 0 && e.type == "mousedown";
    mouse.middle = e.button == 1 && e.type == "mousedown";
    mouse.right = e.button == 2 && e.type == "mousedown";
};
onscroll = function (e) {
    mouse.scroll = window.scrollX - mouse.lastScroll;
    mouse.lastScroll = window.scrollX;
};
function gamepadInput(index) {
    if (index < 0 || index > 4) {
        return null;
    }
    var gamepad = navigator.getGamepads()[index];
    if (gamepad == null)
        return null;
    var GamepadData = {
        joysticks: {
            left: {
                x: gamepad.axes[0],
                y: gamepad.axes[1],
                down: gamepad.buttons[10].pressed,
            },
            right: {
                x: gamepad.axes[2],
                y: gamepad.axes[3],
                down: gamepad.buttons[11].pressed,
            },
        },
        buttons: {
            A: gamepad.buttons[0].pressed,
            B: gamepad.buttons[1].pressed,
            X: gamepad.buttons[2].pressed,
            Y: gamepad.buttons[3].pressed,
            start: gamepad.buttons[9].pressed,
            select: gamepad.buttons[8].pressed,
            home: gamepad.buttons[16].pressed,
            LT: gamepad.buttons[6].pressed,
            RT: gamepad.buttons[7].pressed,
            LB: gamepad.buttons[4].pressed,
            RB: gamepad.buttons[5].pressed,
        },
        dPad: {
            up: gamepad.buttons[12].pressed,
            down: gamepad.buttons[13].pressed,
            left: gamepad.buttons[14].pressed,
            right: gamepad.buttons[15].pressed,
        },
    };
    return GamepadData;
}
function mouseInput() {
    var mouseData = {
        x: mouse.x,
        y: mouse.y,
        buttons: {
            middle: mouse.middle,
            left: mouse.left,
            right: mouse.right,
        },
        scroll: mouse.scroll,
    };
    return mouseData;
}
function getKey(keycode) {
    return keys[keycode] || false;
}
export { gamepadInput, mouseInput, getKey };
