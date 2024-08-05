//Mouse Section Start
const mouse = {
    b: {
        l: false,
        r: false,
        m: false
    },
    x: 0,
    y: 0,
    s: 0,
    m: {
        x: 0,
        y: 0
    }
}
onmousedown = onmouseup = function (event) {
    mouse.b.l = event.button == 0 && event.type == "mousedown"
    mouse.b.r = event.button == 1 && event.type == "mousedown"
    mouse.b.m = event.button == 2 && event.type == "mousedown"
}
onmousemove = function (event) {
    if (document.pointerLockElement == null) {
        mouse.x = event.x
        mouse.y = event.y
    } else {
        mouse.x += event.movementX
        mouse.y += event.movementY
    }
    mouse.m.x = event.movementX
    mouse.m.y = event.movementY
}
document.onscroll = function (event) {
    mouse.s = event.deltaY || event.wheelDeltaY;
};
function getMouseData() {
    return {
        x: mouse.x,
        y: mouse.y,
        buttons: {
            left: mouse.b.l,
            right: mouse.b.r,
            middle: mouse.b.m
        },
        scroll: mouse.s,
        movement: mouse.m
    }
}

//Keys Section Start

let keys = {
    key: {},
    code: {}
}

onkeydown = onkeyup = function (event) {
    keys.code[event.keyCode] = event.type == "keydown"
    keys.key[event.key] = event.type == "keydown"
}

function getKeyCode(keycode) {
    return keys.code[keycode] ?? false;
}
function getKey(keyname) {
    return keys.key[keyname] ?? false;
}

//Gamepad Section Start

const g = navigator.getGamepads();

function isNull(GamepadIndex) {
    if (GamepadIndex > 4 || GamepadIndex < 1) return true;
    return g[GamepadIndex - 1] == null;
}

function getJoystick(GamepadIndex, StickSide) {
    if (GamepadIndex > 4 || GamepadIndex < 1 || isNull(GamepadIndex) == null) return { x: 0, y: 0 };

    if (StickSide == "left") {
        return {
            x: Math.round(g[GamepadIndex - 1].axes[0] * 100) / 100,
            y: Math.round(g[GamepadIndex - 1].axes[1] * 100) / 100,
        }
    }

    if (StickSide == "right") {
        return {
            x: Math.round(g[GamepadIndex - 1].axes[2] * 100) / 100,
            y: Math.round(g[GamepadIndex - 1].axes[3] * 100) / 100,
        }
    }
    return { x: 0, y: 0 }
}

function getButton(GamepadIndex, ButtonIndex) {
    if (GamepadIndex > 4 || GamepadIndex < 1 || isNull(GamepadIndex) == null) return { pressed: false, touched: false, value: 0.00 };
    return {
        pressed: g[GamepadIndex - 1].buttons[ButtonIndex].pressed,
        touched: g[GamepadIndex - 1].buttons[ButtonIndex].touched,
        value: g[GamepadIndex - 1].buttons[ButtonIndex].value
    } ?? {
        pressed: false,
        touched: false,
        value: 0.00
    }
}
function getButtonAmount(GamepadIndex) {
    if (GamepadIndex > 4 || GamepadIndex < 1 || isNull(GamepadIndex) == null) return 0;
    return g[GamepadIndex - 1].buttons.length ?? 0;
}


function useDeadzone(StickValue, MinNumber) {
    if (StickValue >= -MinNumber && StickValue <= MinNumber) return 0;
    return StickValue;
}

function addShake(GamepadIndex, Time, Force) {
    if (GamepadIndex > 4 || GamepadIndex < 1 || isNull(GamepadIndex)) return;
    g[GamepadIndex - 1].vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        strongMagnitude: Force,
        weakMagnitude: Force,
        duration: Time,
    });
    return;
};

export default {
    getMouseData,
    getKey,
    getKeyCode,
    gamepad: {
        useDeadzone,
        getButton,
        getJoystick,
        getButtonAmount,
        isNull,
        addShake

    }
}
