// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *   background, createCanvas, HSB, colorMode, noStroke, color
 *   random, width, height, windowWidth, windowHeight, fill, ellipse
 */

// Declare any variables we will be using here.
let dots, numberOfDot;
let dotObject1;
let dotObject2;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  numberOfDot = 100
  dots = [];
  for (let i = 0; i < numberOfDot; i++) {
    let dotObject = new BouncyDot();
    dots.push(dotObject);
  }
}

function draw() {
  background(220, 0, 80);

for (let dot of dots){
    dot.bounce();
    dot.draw();
  }
}

class BouncyDot {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(5, 12);
    this.color = random(360);
    this.baseXVelocity = random(0.5, 3);
    this.baseYVelocity = random(0.5, 3);
    this.xVelocity = this.baseXVelocity;
    this.yVelocity = this.baseYVelocity;
  }
  
  // Method : function that belongs to a class
  bounce() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.baseXVelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.baseXVelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.baseYVelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.baseYVelocity;
    }
  }
  
  draw() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}
