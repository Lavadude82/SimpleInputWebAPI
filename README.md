# SimplerGamepadAPI
Web Browser Gamepad API is a bit complicated, why not make it simple?  
I even sprinkled some general input.

# gamepadInput(index:number)
This function returns the gamepad item in a way more readable, and easier to code with. 
Some third party controllers may not work.

# mouseInput()
This function returns event details in a readable and simple way aswell. 
I recommend locked.x and locked.y as they are better for both unlocked pointers and locked pointers.  
https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

# getKey(keycode:number)
This functions returns true or false based on if a key is pressed or not. 
This method will work better than using the keydown event because it doesn't just detect when the key is down.
