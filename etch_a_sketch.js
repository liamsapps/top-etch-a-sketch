/********************************************************************************
 * Author: Liam Sirkett
 * Date: Feb.07/2025
 * Project: Etch A Sketch
 * Description: Create a browser based 'Etch A Sketch' toy using Javascript.
 */

const container = document.querySelector("#container");

let squaresPerRow = 16;
let squares = squaresPerRow ** 2;
let squareWidth = 480 / squaresPerRow;
let numRows = 480 / squareWidth;

// console.log(`${squares} squares each having a width of ${squareWidth} over ${numRows} rows`);

// generate a random list of 10 hexadecimal colors
function generateColorList() {
    const colors = [];

    for (let i = 0; i < 10; i++) {
        // The number 16,777,215 is the decimal value of the color white
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(randomColor);
    }
    
    return colors;
}

function getColorFromList() {
    let colorList = generateColorList();
    return colorList[Math.floor(Math.random() * colorList.length)];
}

// will be used to set a random background color on an active (hovering) div
function getCssRules() {
    var rules = {};
    for (var i = 0; i < document.styleSheets.length; ++i) {
        var cssRules = document.styleSheets[i].cssRules;
        for (var j = 0; j < cssRules.length; ++j)
            rules[cssRules[j].selectorText] = cssRules[j];
    }
    return rules;
}

function cssGetClass(name) {
    var rules = getCssRules();
    if (!rules.hasOwnProperty(name))
        throw 'TODO: deal_with_notfound_case';
    return rules[name];
}

// create a box of square div elements
for (i = 0; i < squares; i++) {
    let square = document.createElement("div");
    // set each div's id (makes div easier to access)
    square.setAttribute("id", `square${i}`);
    // set width based on number of divs per row
    square.style.width = `${squareWidth}px`;
    
    // fires when cursor enters each div element's boundaries
    square.addEventListener("mouseenter", (e) => {
        // retrieve event target's id
        let divTargetID = e.target.id;
        console.log(`Before: ${divTargetID}`);
        let divEntered = document.querySelector(`#${divTargetID}`);

        // change background-color in .entered CSS class
        // WORKS
        // cssGetClass('.entered').style.background = "pink";
        cssGetClass('.entered').style.background = getColorFromList();

        divEntered.classList.add("entered");

    });

    // fires when cursor is over the div element and then moves to the outside of the div's boundaries
    square.addEventListener("mouseleave", (e) => {
        // retrieve event source element's id
        let divTargetID = e.srcElement.id;
        let divExited = document.querySelector(`#${divTargetID}`);
        // deactivate the class to remove background color
        divExited.classList.toggle("entered");
        
        
    });

    
    container.appendChild(square);
}