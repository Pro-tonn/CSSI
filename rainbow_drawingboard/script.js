// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *   background, createCanvas, HSB, colorMode, noStroke, color,
 *   rect, mouseX, mouseY, stroke, fill, strokeWeight, ellipse, random, width, 
 height,radius, mouseIsPressed, pmouseX, pmouseY, line, constrain, triangle, square, ENTER, keyCode
 */

// - detect keyboard button
// - clear the canvas
// - mouse click
// - random colour

// Declare any variables we will be using here.
let brushHue;
let backgroundColor;
let randomNumber;
let x;
let y;
let circleSize;
let radius;
let priorMouseX;
let priorMouseY;
let strokeW;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeW = 6;
  strokeWeight(strokeW);
  backgroundColor = 95;
  background(backgroundColor);
  randomNumber = random();
}

function draw() {
  chooseColors();
  //increaseStrokeWeight();
  // pmouseX and pmouseY saves the previous position of the mouse
  if (mouseIsPressed){
    line(pmouseX,pmouseY,mouseX, mouseY); 
  } 
  if (pmouseY< mouseY){
    increaseStrokeWeight();
  }else if (pmouseY > mouseY){
    decreaseStrokeWeight();
  }
  
  
  priorMouseX = mouseX;
  priorMouseY = mouseY;
}

function chooseColors() {
  // if (brushHue > 360) {
  //   brushHue = 0;
  // }
  // // hue goes from 0 to 360
  // brushHue += 1;
  brushHue = random(0,360)
  
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
  
}

function decreaseStrokeWeight() {
  strokeWeight(strokeW);
  strokeW = constrain(strokeW - 0.3, 6, 50);
}

function increaseStrokeWeight(){
  strokeWeight(strokeW);
  strokeW = constrain(strokeW + 0.3, 6, 50);
}

// this is called for every keyPress
function keyPressed() {
  if (keyCode === ENTER){
    clearCanvas()
  } else if (keyCode === 84){
    triangle(mouseX, mouseY, mouseX + 50, mouseY + 50, mouseX - 50, mouseY + 50);
  } else if (keyCode === 67){
    ellipse(mouseX, mouseY, 50, 50)
  } else if (keyCode === 83){
    square(mouseX, mouseY, 50);
  }
  
}

// this is called everytime the mouse is pressed
// function mousePressed() {
//   // ellipse(random(25, width - 25),random(25, height  - 25),50,50)
//   circleSize = 50
//   radius = circleSize/2;
//   x = random(radius, width-radius);
//   y = random(radius, height-radius);
//   ellipse(x,y,circleSize)
// }

function clearCanvas(){
  background(backgroundColor)
}

function mouseReleased(){
 strokeW = 6;

}