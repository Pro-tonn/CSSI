/* global p5Function1, p5Function2, createCanvas, random, background, color, ellipse, fill, stroke, abs, mouseX, mouseY, image
 *  text, textSize, pow, sqrt, loadImage
 */

let ballX, ballY, radius;
let xVelocity, yVelocity;
let ballColor, ballSaturation, ballBrightness;
let canvasWidth, canvasHeight;
let xMouseDistFromBall, yMouseDistFromBall, mouseDist;
let lavaBackground;
let score;
let loseUI, playAgain, startGame;
let gameState;
let colorBackground, Lbackground, mBackground;

function setup() {
  mBackground = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2Fmainbg.png?v=1626481142814"
  );
  Lbackground = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2Flavabg.jpg?v=1626480723581"
  );
  lavaBackground = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2Flavabg.png?v=1626475787546"
  );
  loseUI = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2FLp5.png?v=1626480042496"
  );
  playAgain = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2Fimageedit_2_5849735821.png?v=1626478173369"
  );
  startGame = loadImage(
    "https://cdn.glitch.com/4d6115a9-0b98-47d4-867d-6f201417000f%2Fimageedit_5_7097802551.png?v=1626480199112"
  );

  score = 0;
  canvasWidth = 600;
  canvasHeight = 600;
  background(220);
  createCanvas(canvasWidth, canvasHeight);
  radius = 80;
  ballX = random(radius, canvasWidth - radius);
  ballY = random(radius, canvasHeight / 2);
  ballColor = random(0, 360);
  ballSaturation = random(50, 100);
  ballBrightness = random(50, 100);
  xVelocity = 2;
  yVelocity = 3;
  background(220);
  gameState = "notStarted";
  textSize(50);
}
function draw() {
  if (gameState == "notStarted") {
    image(Lbackground, 0, 0, 600, 600);
    fill(300);
    text("Keep Juggling", 150, 200);
    text("Or Die Trying", 160, 300);
    image(startGame, 200, 350, 200, 90);
  }

  if (gameState == "playing") {
    image(mBackground, 0, 0, 600, 600);
    chooseColor();
    ellipse(ballX, ballY, radius * 2);
    image(lavaBackground, 0, canvasHeight - 40, canvasWidth, 100);
    ballY += yVelocity;
    ballX += xVelocity;
    xMouseDistFromBall = abs(mouseX - ballX);
    yMouseDistFromBall = abs(mouseY - ballY);
    //distance formula for circle collision
    mouseDist = sqrt(pow(xMouseDistFromBall, 2) + pow(yMouseDistFromBall, 2));

    textSize(30);
    text("Score: " + score, 20, 50);

    //top side
    if (ballY < radius) {
      yVelocity *= -1;
    }
    //left side
    else if (ballX < radius) {
      xVelocity *= -1;
    }
    //right side
    else if (ballX > canvasWidth - radius) {
      xVelocity *= -1;
    }
    //bottom side
    else if (ballY > canvasHeight + radius) {
      colorBackground = random(0, 360);
      background(colorBackground, 100, 100);
      textSize(40);
      image(loseUI, 200, 200, 200, 150);
      // text("YOU LOSE!", 200, 200);
      text("Score: " + score, 220, 340);
      image(playAgain, 240, 350, 120, 90);
      gameState = "over";
    }
  }
}

function mouseClicked() {
  //check if inside circle
  if (mouseDist <= radius && yVelocity > 0) {
    score++;
    yVelocity = -abs(yVelocity * 1.1);
    radius *= 0.95;
    xVelocity = random(-5, 5);
    ballColor = random(0, 360);
    ballSaturation = random(50, 100);
    ballBrightness = random(50, 100);
  }
  if (gameState == "over") {
    //check if the user presses the play again button
    if (mouseX > 240 && mouseX < 360 && mouseY > 350 && mouseY < 440) {
      gameState = "playing";
      ballY = 150;
      score = 0;
      radius = 80;
      xVelocity = 2;
      yVelocity = 2;
    }
  } else if (gameState == "notStarted") {
    if (mouseX > 200 && mouseX < 400 && mouseY > 350 && mouseY < 440) {
      gameState = "playing";
      ballY = 150;
      score = 0;
      radius = 80;
      xVelocity = 2;
      yVelocity = 3;
      gameState = "playing";
    }
  }
}
function chooseColor() {
  stroke(ballColor, ballSaturation, ballBrightness);
  fill(ballColor, ballSaturation, ballBrightness);
}
