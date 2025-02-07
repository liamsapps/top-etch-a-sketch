/********************************************************************************
 * Author: Liam Sirkett
 * Date: Feb.07/2025
 * Project: Etch A Sketch
 * Description: Create a browser based 'Etch A Sketch' toy using Javascript.
 */

const container = document.querySelector("#container");

let squaresPerRow = 16;
// VERY small squares !!!
// let squaresPerRow = 64;
// VERY VERY small squares !!!
// let squaresPerRow = 100;
let squares = squaresPerRow ** 2;
let squareWidth = 480 / squaresPerRow;
let numRows = 480 / squareWidth;
// ALL rows & squares not visible
// let squareWidth = 960 / squaresPerRow;
// let numRows = 960 / squareWidth;
// let squareWidth = 640 / squaresPerRow;
// let numRows = 640 / squareWidth;

console.log(`${squares} squares each having a width of ${squareWidth} over ${numRows} rows`);
// let squares = 16;
// let width = 960 / 16;


for (i = 0; i < squares; i++) {
    let square = document.createElement("div");
    // square.textContent = i;
    square.style.width = `${squareWidth}px`;
    // square.style.width = "30px";
    console.log(`square${i} added.`)
    container.appendChild(square);
}