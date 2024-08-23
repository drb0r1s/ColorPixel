// -------------------------- //
// BROUGHT TO YOU BY DRB0R1S //
// ------------------------ //

// Let's first get all the elements that will be useful in variables.
const dot = document.querySelector(".dot");
const quote = document.querySelector(".quote");
// Syntax: input[type='color'] does nothing else, but selecting the input, which has type "color".
// It's important to know that there are many other input types (text, password, email, date...).
// Also, it is noticable that in the current code we don't need to specify what kind of input we want to select, since we only have one input. However, if we expand the applicant and add other inputs (eg for number of rows and columns) this will be pretty useful.
const colorInput = document.querySelector("input[type='color']");
const cursor = document.querySelector(".cursor");
const instructionKeywords = document.querySelectorAll(".instructions-holder strong span");

// This kind of variable is called "flag" in programming.
// We are going to use this variable to know whether the cursor color has been updated or not.
// This is important, because the code is written in such way in which we are changing the color of cursor every time we change the color of other elements.
// IMPORANT: Since we change the color of the cursor in the same function where we change the color of everything else, we want to the it just once for cursor.

// WHY DO WE WANT TO CHANGE THE COLOR OF THE CURSOR ONLY ONE?
// That way, we will achieve random color for cursor at the start, every time the page is refreshed.
// Now, if we don't make sure that cursor is updated just once, it will interrupt the user, who wants to color with a specific color, because it will randomly change the color, when every other element does.
let isCursorUpdated = false;

// Let's set random color for everything that changes color in the application.
// We are calling this function outside of interval at first, because we want immediate color change.
setRandomColor();
// After that, we will set an interval that is going to do exactly the same thing every 5 seconds.
setInterval(() => setRandomColor(), 5000);

function generateRandomColor() {
    // Here, we are defining an array, which contains variables red, green and blue as the first, second and third element.
    // IMPORTANT: Keep in mind that even though red is the first element of this array, it's on the index 0 (counting in programming starts at 0).
    const [red, green, blue] = [
        // Below you can see the way we generate a random number in JavaScript.
        // We are first calling the function Math.floor().
        // Math.floor() function is used to get rid of decimals while getting a random number (eg if 4.646 is generated, Math.floor() will return 4).
        // As a Math.floor() parameter we have "Math.random() * 256".
        // Math.random() function always returns a number between 0 and 1.
        // IMPORTANT: Keep in mind that we are working with floating point and not just natural numbers. So, there are ifinite amount of number between 0 and 1 (eg 0.14, 0.56, 0.144).
        // When we get our random number between 0 and 1, let's multiply that number with arbitary number.
        // In our case we are going to use 256, because RGB system can have red, green and blue values between 0 and 255.
        // IMPORTANT: Notice how we can go up to 255, even though we have written 256.
        // It is important to remember that max value you can generate this way is always arbitary number - 1 (in our case max = 256 - 1 = 255).
        // We're doing this three times to get three random numbers (for red, green and blue - RGB system).
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256)
    ];

    // What if all three numbers have the false value (0)?
    // We are going to get black color (#000000 = BLACK). Our background color is black and we do not want black text as well, thus we prevent it like this.
    // IMPORTANT: Calling a function inside its definition is called recursion and is one of the most important concept of programming.
    // If we return function, the function will be called again and again until this if condition is false.
    if(!red && !green && !blue) return generateRandomColor();
    // When the if condition is false, we are simply going to return our color.
    return [red, green, blue];
}

function setRandomColor() {
    // Let's extract those random colors we got from generateRandomColor() function.
    const [red, green, blue] = generateRandomColor();
    // We can set color in CSS using the following format:
    const randomColorCSS = `rgb(${red}, ${green}, ${blue})`;

    // Let's update colors of dot (rotating dot above the letter i in "COLORPICKER") and quote ("It's in the pixel.").
    dot.style.backgroundColor = randomColorCSS;
    quote.style.color = randomColorCSS;

    // Notice that we defined instructionKeywords variable using querySelectorAll() method (not querySelector()).
    // That simply means that we have more elements, so this variable is an array.
    // In JavaScript, we have built-in function forEach(). This function is exactly the same as for loop, it will loop through every element in the array.
    // How this function works is that we define how are we going to call each element (instructionKeyword in our case, it is optional).
    instructionKeywords.forEach(instructionKeyword => {
        // Now let's update the color of each instruction keyword (W, A, S, D, SPACE).
        instructionKeyword.style.color = randomColorCSS;
    });
    
    // Here, we are using our "flag" variable to check if this is the first time we're updating the color of the cursor.
    if(!isCursorUpdated) {
        // If it is, then let's change our flag to true. Now this if statement will never happen again.
        isCursorUpdated = true;
        // Here, we are updating the color of the border of the cursor element.
        cursor.style.border = `3px solid ${randomColorCSS}`;

        // Using decimalToHexadecimal() function, we are able to set the color inside the input element.
        // IMPORTANT: Explanation of the decimalToHexadecimal() function as well as answer to why we need it is below.
        const hexadecimalRandomColor = decimalToHexadecimal([red, green, blue]);
        colorInput.value = hexadecimalRandomColor;
    }
}

// WHY DO WE EVEN NEED THIS FUNCTION?
// Well, in order to set the value of an input element in HTML, we need to update "value" attribute inside the input definition.
// It looks like this: <input type="color" value="...">
// In our case, whatever color is located in value will be displayed.
// IMPORTANT: The only valid format we can use to set the "value" attribute in HTML (or in JavaScript, that will affect HTML) is HEXADECIMAL format.
// That's why we need this function, to convert our random red, green and blue numbers into one, hexadecimal number.
function decimalToHexadecimal([decimalRed, decimalGreen, decimalBlue]) {
    // Here, we are defining an array, that contains three elements.
    // Every element is hexadecimal representation of it's decimal value.
    // In JavaScript, we are using ".toString(16)" to convert decimal into hexadecimal number.
    // EXAMPLE: 11.toString(16) => "B" (B in hexadecimal system is equal to decimal 11).
    const [hexadecimalRed, hexadecimalGreen, hexadecimalBlue] = [
        decimalRed.toString(16),
        decimalGreen.toString(16),
        decimalBlue.toString(16)
    ];

    // We came across another problem.
    // So, valid format that HTML, CSS and JS accept as hexadecimal number for colors is #ffffff.
    // Basically, we need 6 digits, but if we have small numbers (0-15 decimal => 0-F hexadecimal) it is going to return just one digit.
    // To fix this, let's check the length of hexadecimal number, if it is only one digit, let's add 0.
    // If we have more than one digit (max is two digits anyway) we are just going to use that number as it is.
    const doubleDigit = [
        hexadecimalRed.length === 1 ? "0" + hexadecimalRed : hexadecimalRed,
        hexadecimalGreen.length === 1 ? "0" + hexadecimalGreen : hexadecimalGreen,
        hexadecimalBlue.length === 1 ? "0" + hexadecimalBlue : hexadecimalBlue
    ];

    // Let's combine all hexadecimal numbers for red, green and blue color into just one hexadecimal number.
    const hexadecimalNumber = `#${doubleDigit[0] + doubleDigit[1] + doubleDigit[2]}`;
    // Let's simply return that number.
    // We successfully got hexadecimal number from three decimal numbers.
    return hexadecimalNumber;
}

// If value of the color input is changed, let's update color of the cursor as well.
colorInput.onchange = () => {
    cursor.style.border = `3px solid ${colorInput.value}`;
}

// Table is an HTML element that contains rows and columns, tbody on the other hand is optional.
const table = document.querySelector("table tbody");

// Here we have nested for loop, the main (parent) for loop is used for rows, the inner (child) for loop is used for columns.
for(let i = 0; i < 5; i++) {
    // tr is an HTML element that represents row inside the table (tr - TABLE ROW).
    const tr = document.createElement("tr");
    
    for(let j = 0; j < 5; j++) {
        // td is an HTML element that is basically a member of the row, we are going to use it as a cell of our table.
        const td = document.createElement("td");
        // Let's give each cell and id with the following info pixel-(ROW)(COLUMN).
        // This is pretty useful, that way we can access any cell and we also know coordinates of each cell.
        td.id = `pixel-${i}${j}`;

        // Let's put our new td element inside the row.
        tr.appendChild(td);
    }

    // Let's put our new tr element inside the table.
    table.appendChild(tr);
}

// This is just another so called "flag" variable.
// Because movement of our cursor is asynchronous (it takes some time (300ms - because of transition propery in css) to complete movement) we want to know when the movement is finished, so we can make the next one.
let blockMovement = false;
// Let's now define an array that is going to contain all buttons on keyboard that have some function when pressed.
const allowedKeys = ["w", "a", "s", "d", "up", "down", "left", "right", "space"];
// Finally, let's define an object (object is every variable that is defined in { kay: value } pattern).
// We will use position object to keep track of current row-column position of our cursor.
// Starting position of the cursor is, of course, row 0 and column 0.
const position = { row: 0, column: 0 };

// Now, let's define an event listener that is going to call a certain fuction every time the user has pressed a key.
// IMPORANT: In JavaScript, if anonymous function (anonymous function is every function that is defined without a name) can be defined without (), if it has one parameter (eg name => console.log("Hello " + name), instead of (name) => ...).
// WHAT IS THIS PARAMETER e?
// This "e" is short for event. Every time event listener happens in JavaScript, we are going to get this event, that has all the information about the action that we need (in our case, all the information about the pressed key).
window.addEventListener("keydown", e => {
    // We are using the .key property of e parameter (every "child" of an object is called property and e is and object).
    // This .key parameter gives us the name of the keyboard button that was pressed.
    // Let's use built-in JavaScript function .toLowerCase(), so we can get the name of the keyboard button, but with lowercase letters.
    // WHY WE NEED .toLowerCase()?
    // Well, to make checking if the right key has been pressed easier (for example, if W is pressed it will be converted to w, so we are just checking for w and not for W as well).
    let key = e.key.toLowerCase();

    // We can use W, A, S, D to move around, but arrows and keyboard are also allowed.
    // Names of keyboard letters are: ArrowUp, ArrowDown, ArrowLeft, ArrowRight.
    // We don't want to waste time writing Arrow every time, so let's get rid of it.
    // For example, if arrow up is pressed, key = "arrowup" (not "ArrowUp" because of .toLowerCase()).
    // Now, let's use the .split() method in JS, "arrowup".split("arrow") => ["", "up"], the second element (first index) is "up", which is simply what we need.
    if(key.includes("arrow")) key = key.split("arrow")[1];
    // Also, since JS didn't name space button as "space" but " ", let's rename it, so we don't get confused later.
    else if(key === " ") key = "space";

    // If movement is currently happening, let's escape the function.
    // Or, it index of our variable key is -1 in allowedKeys array (which means that key doesn't exist in that array) let's also escape the function.
    // Example: If we press the letter O, it isn't in allowedKeys, thus we conclude that it isn't important for us and we cancel the function right away.
    if(blockMovement || allowedKeys.indexOf(key) === -1) return;

    // Before we perform an actual movement, let's get values of current top and left positions of the cursor, so we can update those positions.
    // getComputedStyle(element).getPropertyValue(name of css property) is the default way to get CSS values in JavaScript.
    // IMPORTANT: Properties "top" and "left" are in pixels (eg "50px"), we want just a pure number, so let's use parseInt() for that.
    const currentTop = parseInt(getComputedStyle(cursor).getPropertyValue("top"));
    const currentLeft = parseInt(getComputedStyle(cursor).getPropertyValue("left"));

    // Here, instead of confusing if tree, let's define one easy-to-read switch statement.
    // Switch statement is going to perform any case that matches the value of key variable.
    // IMPORTANT: At the end of every case we HAVE to add "break", otherwise the code will start performing the next case.
    // "default" keyword is optional in this switch statement.
    switch(key) {
        case "w":
        case "up":
            // If current top value is below 50 (height of a cell is 50px) that means that we are currently in the first row, we can't go up anymore, let's cancel the function.
            if(currentTop < 50) return;

            // Here, we are substracting the current top value by 50, so we are going exactly one cell up.
            cursor.style.top = `${currentTop - 50}px`;
            // Let's update the information of our current row location.
            position.row--;

            break;

        case "a":
        case "left":
            // EXACTLY THE SAME LOGIC AS FOR GOING UP, JUST CHECKING LEFT INSTEAD OF TOP.
            if(currentLeft < 50) return;

            cursor.style.left = `${currentLeft - 50}px`;
            position.column--;

            break;

        case "s":
        case "down":
            // We are using 4 * 50 to check if we are in the last row (there are 5 rows, so 5 - 1, as for the index values).
            if(currentTop > 4 * 50) return;

            // Now, let's add the height of one cell (50px), to move the cursor down.
            cursor.style.top = `${currentTop + 50}px`;
            position.row++;

            break;

        case "d":
        case "right":
            // EXACTLY THE SAME LOGIC AS FOR GOING DOWN, JUST CHECKING LEFT INSTEAD OF TOP.
            if(currentLeft > 4 * 50) return;

            cursor.style.left = `${currentLeft + 50}px`;
            position.column++;

            break;

        case "space":
            // If space is pressed, that means that we want to color the target cell, so let's get it into variable.
            // We know which cell is cursor currently on, because we kept track of that in position object.
            // Also, we named every cell pixel-(ROW)(COLUMN), so it's pretty easy to target the right cell right now.
            const targetPixel = document.getElementById(`pixel-${position.row}${position.column}`);
            // When we have the right cell, let's simply update its background color.
            targetPixel.style.backgroundColor = colorInput.value;

            // The following three lines of code are used for the "flasing" animation when on cursor when space is pressed.
            // We need to know previous color of the border, so we can return it after flashing animation.
            // getComputedStyle() and getPropertyValue() are explained above.
            const prevCursorBorder = getComputedStyle(cursor).getPropertyValue("border");
            cursor.style.border = "3px solid white";
            setTimeout(() => { cursor.style.border = prevCursorBorder }, 300);

            // If space is pressed, we don't need to update blockMovement to true, because space doesn't involve any movement, unlike other allowed keys.
            // Because of that, let's escape the function.
            return;
        // "default" does nothing in this switch statement and is optional here.
        // It's the developer's preference whether the empty default will be written or not.
        default:
    }

    // Updating the flag variable to true, so we now that movement is happening, thus we are blocking any future key presses.
    blockMovement = true;
    // After 301ms (1 extra ms to avoid possible bugs, nothing special), we know that movement is finished.
    // Movement of cursor is 300ms because of CSS; transition: 300ms.
    setTimeout(() => { blockMovement = false }, 301);
});

// -------------------------- //
// BROUGHT TO YOU BY DRB0R1S //
// ------------------------ //