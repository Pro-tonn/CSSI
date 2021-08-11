// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *   background, createCanvas, HSB, colorMode, noStroke, color, random
 *   fill, rect, ellipse, keyCode, UP_ARROW, textSize, text, width, height
 *   DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW
 *   collideRectCircle, keyIsDown, SHIFT, loadImage, image, round
 */

/*
TODO:
 - moving the frog different directions (keypress) (DONE)
 - moving the "car" (DONE)
 - restart game when reaching yellow (DONE)
 - lives countdown (DONE)
 - scorekeeping (partially DONE)
 - highscore?
 - multiple obstacles
*/

let backgroundColor,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V, road, time;
let speed;
let carWidth, carHeight;
let goalHeight;
let frogDiameter;
let isGlide;
let isPowerUp;
let timeDown;

function setup() {
  // Canvas & color settings
  isPowerUp = random(500);
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2;
  frogY = height - 20;
  score = 0;
  lives = 3;
  time = 1000;
  gameIsOver = false;
  car1X = 0; // x position of the car
  car1Y = 100; // y position of the car
  car1V = 5; // velocity of the car
  carWidth = 40;
  carHeight = 30;
  speed = 10;
  frogDiameter = 20;
  isGlide = false;
  road = loadImage("https://cdn.glitch.com/f49e26b6-ae07-4216-bc3c-1272ce36b151%2Froad.png?v=1626826126605")
  timeDown = false;
}

// IMPORTANT: Don't edit the contents of this function. Instead, add code to the
// named functions below.
function draw() {
  background(backgroundColor);
  image(road, 0,0,width, height-35)
  goalHeight = 50;
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, goalHeight);

  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, frogDiameter);
  

  // if (!gameIsOver) {
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  // }
  if(isGlide == true && !gameIsOver){
    modeGlide();
  }
  if (gameIsOver) {
    speed = 0;
  }
  if(round(isPowerUp,0) != 7){
    isPowerUp = random(500);
  }
  if(round(isPowerUp,0) == 7){
    
    powerUp();
    
  }

  
  if(timeDown){
    timer;
  }
  
    // drawSprites();
}

function powerUp(){
  textSize(12)
  text(`Power up available`, 200, 20) ;
  text(`Press a to activate`,200, 35) ;
  
}

function modeGlide(){
  if(keyIsDown(UP_ARROW)){
    frogY -= 1;
  }
  if(keyIsDown(DOWN_ARROW)){
    frogY += 1;
    if(frogY > height -25){
        frogY = height - 25;
        frogX = width/2}
  }
  if(keyIsDown(LEFT_ARROW)){
    frogX -= 1;
  }
  if(keyIsDown(RIGHT_ARROW)){
    frogX += 1;
  }
}

function timer(){
  time-= 10;
}

function keyPressed() {
  if(round(isPowerUp,0) == 7){
    if (keyCode === 65 ) {
      
      time -=100;
      car1V = 1;
      timeDown = true;
      if (time < 0){
        isPowerUp = random(500);
        car1V = 5;
        time = 1000;
        timeDown = false;
      }
    }
  }
  if(!isGlide){
    if (keyCode === UP_ARROW) {
      frogY -= speed;
    }
    if (keyCode === DOWN_ARROW) {
      frogY += speed;
      if(frogY > height -25){
        frogY = height - 25;
        frogX = width/2
      }
        
    }
    if (keyCode === LEFT_ARROW) {
      frogX -= speed;
    }
    if (keyCode === RIGHT_ARROW) {
      frogX += speed;
    }
  }
  if (keyCode === SHIFT){
    if(isGlide){
      isGlide = false;
    }else{
      isGlide = true;
    }
  }
}



function moveCars() {
  // Move the car
  // change the coordinates of the shape
  car1X += car1V;
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = -carWidth;
    // create a safe zone here
    car1Y = random(goalHeight, height - carHeight - goalHeight);
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, carWidth, carHeight);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  // collideRectCircle(x1, y1, width1, height1, cx, cy, diameter)
  let hit = collideRectCircle(
    car1X,
    car1Y,
    carWidth,
    carHeight,
    frogX,
    frogY,
    frogDiameter
  );
  if (hit) {
    // What happens when the car spawns exactly
    // on the frog?
    // 1. safe zone at the bottom!
    lives -= 1;
    resetFrog();
    if (lives == 0) {
      gameIsOver = true;
    }
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY <= goalHeight) {
    // Frog is in the goal!
    score += 1;
    resetFrog();
  }
}

function resetFrog() {
  frogY = height - 20;
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 35);
  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height/2);
  }
}

// function frogAnimation(){
//   let frog 
  
//   frog = prite.draw = function() { ellipse(frogX,frogY,frogDiameter,10) }
//   //  var myAnimation = frog.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  
// }