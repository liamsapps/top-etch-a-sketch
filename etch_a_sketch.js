/********************************************************************************
 * Author: Liam Sirkett
 * Date: Feb.07/2025
 * Project: Etch A Sketch
 * Description: Create a browser based 'Etch A Sketch' toy using Javascript.
 */

let squaresPerRow = 16;
let squares = squaresPerRow ** 2;
let squareWidth = 480 / squaresPerRow;

const container = document.querySelector("#container");
const btnCreateGrid = document.createElement("button");
btnCreateGrid.textContent = "Create Grid";

document.addEventListener("DOMContentLoaded", (e) => {
    console.log(e);
    createGrid(squares, squareWidth);
});

btnCreateGrid.addEventListener("click", () => {
    let rowSize = 0;
    do { 
        rowSize = prompt("Enter the number of squares per side for the new grid\nMust be a whole positive number not greater than 64");
        // console.log(rowSize);
        let squaresPerRow = rowSize;
        let squares = squaresPerRow ** 2;
        let squareWidth = 480 / squaresPerRow;

        createGrid(squares, squareWidth);
    
    } while (!(Number.isInteger(+rowSize)) || rowSize < 1 || rowSize > 64 || isNaN(rowSize))
    
});

// have button at top of page
let parent = container.parentNode;
parent.insertBefore(btnCreateGrid, container);

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

// will be used to set a random background color on an active (hovering) div,
// will also do the same as mouse leaves div 
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

function createGrid(squares, squareWidth) {

    const gridDivs = document.querySelector("#container");
    if (gridDivs.hasChildNodes()) {
        console.log('children found');
        gridDivs.replaceChildren();
        console.log('container cleared');
    }
    else {
        console.log('first time here');
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

            // using CSS background-color: blue
            divEntered.classList.add("entered");

        });

        // fires when cursor is over the div element and then moves to the outside of the div's boundaries
        square.addEventListener("mouseleave", (e) => {
            // retrieve event source element's id
            let divTargetID = e.srcElement.id;
            let divExited = document.querySelector(`#${divTargetID}`);

            // nothing to do here when using single background color
        });

        
        container.appendChild(square);
    }
}