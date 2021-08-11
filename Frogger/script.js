// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *   background, createCanvas, HSB, colorMode, noStroke, color, random
 *   fill, rect, collideRectCircle, ellipse, keyCode, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, textSize, text, width, height
 *
 */

let backgroundColor, gameState, hit, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, speed;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width / 2;
  frogY = height - 20 ;
  score = 0;
  lives = 5;
  gameIsOver = false;
  gameState = 'playing'
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  speed = 10;
  hit = false;
}

// IMPORTANT: Don't edit the contents of this function. Instead, add code to the
// named functions below.
function draw() {
  
  if (gameState === 'intro' && gameIsOver === false){
    
  }
  if (gameState === 'playing' && gameIsOver === false){
  
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frogY -= speed;
  }
  if (keyCode === DOWN_ARROW){
    if (frogY > height -20){
      frogY = height - 25
      frogX = width / 2
    }
    frogY += speed;
  }
  if (keyCode === RIGHT_ARROW){
    frogX += speed;
  }
  if (keyCode === LEFT_ARROW){
    frogX -= speed;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V
 
  // Reset if it moves off screen

}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  
  if (car1X > width){
    car1X = -40
     car1Y = random(50, height - 70)
  }
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
 hit = collideRectCircle(car1X, car1Y, 40, 30,frogX, frogY, 20);
  if (hit){
    lives --;
    frogY = height-20
    frogX = width/2
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < 50){
    frogY = height-20
    frogX = width/2
    score ++;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  text(`Score: ${score}`, 10, 35);
  // Display Score
if (lives === 0){
  text(`Game Over. \n Your Score is ${score}`, (width/2)-50, height/2)
  speed = 0;
  gameIsOver = true;
}
  // Display game over message if the game is over
}