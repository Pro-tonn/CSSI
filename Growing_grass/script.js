/* global createCanvas, loadImage, image, colorMode, random, HSB, width, loadAnimation, height, background, ellipse, mouseX, mouseY, text, fill, rect, keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, collideRectCircle, noStroke */

/*
*  Add falling realistic droplet
*  
*  Add grass
*    - Draw the grass shape
*    - Draw 3 of these shapes
*  Make the grass move
*    - Make it move up and down
*    - Make it grow as the water falls
* 
*/

let drop1, drop2, drops, grass;
let waterDrop;
let droplet;

var Drop = {
    x: 100,
    y: 0,
    d: 10,
    fallSpeed: 7,
    fallingDown: function(){
        this.y += this.fallSpeed;
        // If it goes off the screen...
        if (this.y > height) {
          // ...reset it...
          this.y = 0;
          // ...and move it somewhere random.
          this.x = random(width);
        } 
      }
    }
  

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 100);
  grass = loadImage("https://cdn.glitch.com/1ca5c552-1507-45cf-9a26-1a2d4075e4eb%2Fgrass.png?v=1626911918619")
  waterDrop = loadImage("http://clipart-library.com/images/Lcd5ndBri.jpg")
  drop1 = Object.assign({}, Drop);
  drop2 = Object.assign({}, Drop);

  
  drops = [drop1, drop2];
  
  
}
var grow = 15;
function preload() {
  droplet = loadAnimation();
}


function draw() {
  background(0, 0, 95);
  image(grass, 0, height-grow, width, grow)
  noStroke();
  fill(60, 80, 80);
  for(let i = 0; i < 2; i++){
    drops[i].fallingDown();
    ellipse(drops[i].x, drops[i].y, drops[i].d);
    grow += 0.5
    if (grow > 800) {
      grow = 800
    }
  }
  // Code for droplet 1
  // Move droplet 1


  

}

function mousePressed() {
  let firstDrop = drops[0];
  console.log(drops[0].x);

}
