/* global p5Function1, p5Function2
 *  createCanvas, background, height, width, line
 *  colorMode. fill, rect, keyCode, UP_ARROW
 *  windowWidth, windowHeight, HSB, colorMode, random
 *  keyIsPressed, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW
 *  loadImage, square, key, image, collideRectRect
 */

// random spawning obstacles
// key functions
// powerups?
// two setups
// score
// time
// high score?

let dino1, dino2, trex;
let cSpawn, Tcactus, Jbackground;
let cactus1X, cactus1Y, cactus1V;
let cactus2X, cactus2Y, cactus2V;
let g, simulationRate;
let loopJump, hit1, hit2;
let xInit1, yInit1, wInit1, hInit1;
let xInit2, yInit2, wInit2, hInit2;
let score1, score2;

class Dino {
  // speed
  // xpos
  // ypos
  constructor(baseY) {
    this.x = 20;
    this.baseY = baseY;
    this.y = this.baseY;
    this.xVelocity = 0;
    this.yInitialVelocity = 100;
    this.yVelocity = this.yInitialVelocity;
    this.width = 30;
    this.height = 40;
    this.falling = false;
    this.looping = false
  }
  draw() {
    fill("green");
    rect(this.x, this.y, this.width, this.height);
  }
  jump() {
    // this.y -= 1;
    // this.looping = true
    if (this.falling) {
      this.y += this.yVelocity;
    }
    if (!this.falling) {
      this.y -= this.yVelocity;
    }
    console.log("after adding: " + this.y);

    this.yVelocity = Math.abs(Math.sqrt(Math.abs(2 * g * (this.y - (this.yInitialVelocity - 0.05)) * simulationRate)));

    console.log(this.yVelocity)
    
    if (this.yVelocity < 0.1) {
      this.falling = true
    }

    if(this.y > this.baseY) {
      this.y = this.baseY
      // this.yVelocity = this.yInitialVelocity
      this.falling = false
      this.looping = false
      console.log("break")
    }

    // if(this.yVelocity > this.yInitialVelocity * 3) {
    //   this.y = this.baseY
    //   this.yVelocity = this.yInitialVelocity
    //   this.falling = false
    //   this.looping = false
    //   console.log("break")
    // }
  }
}

function preload() {
  trex = loadImage(
    "https://cdn.glitch.com/7f273812-cb46-4513-835b-e1b739a8a92a%2Ftrex.png?v=1627085964921"
  );
  Tcactus = loadImage(
    "https://cdn.glitch.com/7f273812-cb46-4513-835b-e1b739a8a92a%2Fdacactus.png?v=1627085130348"
  );
  Jbackground = loadImage(
    "https://cdn.glitch.com/7f273812-cb46-4513-835b-e1b739a8a92a%2FJbackground.jpg?v=1627085875162"
  );
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  //gravity
  simulationRate = 0.0015;
  g = 10;
  loopJump = false;

  //Cactus position
  cactus1X = width - 55;
  cactus1Y = height / 2 - 55;
  cactus1V = -3;
  cSpawn = width + random(300, 900);

  cactus2X = width - 55;
  cactus2Y = height - 55;
  cactus2V = -3;

  
  // top - player1

  //bottom - player2

  dino1 = new Dino(height / 2 - 40);
  dino2 = new Dino(height - 40);

  xInit1 = dino1.x;
  yInit1 = dino1.baseY;
  wInit1 = dino1.width;
  hInit1 = dino1.height;

  xInit2 = dino2.x;
  yInit2 = dino2.y;
  wInit2 = dino2.width;
  hInit2 = dino2.height;
  
  score1 = 0;
  score2 = 0;
}

function draw() {
  background(95);
  line(0, height / 2, width, height / 2);
  Cactus();

  dino1.draw();
  image(trex, dino1.x, dino1.y, dino1.width, dino1.height);
  console.log(dino1.y);

  dino2.draw();
  // dino1.jump();
  image(trex, dino2.x, dino2.y, dino2.width, dino2.height);

  dinoDownArrow();
  dinoSKey();
  obstacleSpeedLeftAndRightArrow();
  obstacleSpeedAAndDKey();
  // checkCollisions();
  
  if (dino1.looping){
    dino1.jump()
  }
  if (dino2.looping){
    dino2.jump()
  }
  
  fill(color(180));
  text(`Player 1 Score: ${score1}`, (width/2)- 50, 20);
  text(`Player 2 Score: ${score2}`, (width/2) - 50, height/2 + 20);
}

function dinoDownArrow() {
  // dino1
  if (keyCode === DOWN_ARROW && keyIsPressed) {
    dino1.x = xInit1;
    dino1.y = height / 2 - wInit1;
    dino1.width = hInit1;
    dino1.height = wInit1;
  } else {
    dino1.x = xInit1;
    dino1.width = wInit1;
    dino1.height = hInit1;
  }
}

function dinoSKey() {
  if (key === "s" && keyIsPressed) {
    dino2.x = xInit2;
    dino2.y = height - wInit2;
    dino2.width = hInit2;
    dino2.height = wInit2;
  } else {
    dino2.x = xInit2;
    // dino2.y = yInit2;
    dino2.width = wInit2;
    dino2.height = hInit2;
  }
}

function obstacleSpeedLeftAndRightArrow() {
  if (keyCode === LEFT_ARROW && keyIsPressed) {
    if (cactus1V < -1) {
      cactus1V += 0.5;
    }
  }

  if (keyCode === RIGHT_ARROW && keyIsPressed) {
    if (cactus1V > -5) {
      cactus1V -= 0.5;
    }
  }
}

function obstacleSpeedAAndDKey() {
  if (key === "a" && keyIsPressed) {
    if (cactus2V < -1) {
      cactus2V += 0.5;
    }
  }

  if (key === "d" && keyIsPressed) {
    if (cactus2V > -5) {
      cactus2V -= 0.5;
    }
  }
}

function checkCollisions() {
  hit1 = collideRectRect(dino1.x, dino1.y, dino1.width, dino1.height, cactus1X, cactus1Y, 30, 30);
  
  if (hit1) {
    cactus1V = 0;
  } else {
    score1++;
  }
  
  hit2 = collideRectRect(dino2.x, dino2.y, dino2.width, dino2.height, cactus2X, cactus2Y, 30, 30);
  
  if (hit2) {
    cactus2V = 0;
  } else {
    score2++;
  }
}

function keyPressed() {
  //up arrow
  if (keyCode === UP_ARROW) {
    dino1.looping = true;
  }
  if (key === "w") {
    dino2.looping = true;
  }
}

// function keyTyped() {
//   if (key === 'w') {
//     loopJump = true;
//   }
// }

function Cactus() {
  image(Jbackground, 0, 0, width, height / 2);
  image(Jbackground, 0, height / 2, width, height / 2);
  image(Tcactus, cactus1X, cactus1Y, 55, 55);
  image(Tcactus, cactus2X, cactus2Y, 55, 55);
  cactus1X += cactus1V;
  cactus2X += cactus2V;
  if (cactus1X < -55) {
    cactus1X = cSpawn;
  }
  if (cactus2X < -55) {
    cactus2X = cSpawn;
  }
}
