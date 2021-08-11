/* global colorMode, noStroke, color, fill, ellipse, background, createCanvas, HSB, text, stroke, line, height, mouseX, mouseY, width,  */

// We'll use variables for most of our colors in this code-along.
let backgroundColor,
  color1,
  color2,
  color3,
  color4,
  textColor,
  globalS,
  globalB;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  lavaBackground = loadImage("https://cdn.glitch.com/613dc1fc-d39b-45ee-8685-22f9c900acf5%2Fp5giflava.gif?v=1626476791685")

  image(lavaBackground, 0, 300, 400, 100)
  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  globalS = 50;
  globalB = 100;
  color1 = color(0, globalS, globalB);
  color2 = color(255, 80, 80);
  color3 = color(12, 80, 255);
  color4 = color(80, 255, 80);
}

function draw() {
  background(backgroundColor);

  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.

  // The red and blue circles:
  // fill(color1);
  // ellipse(width/4, height/2, 50);
  // fill(color2);
  // ellipse(width/4 * 3, height/2, 50);

  // The grey circle and the text:
  
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  text("Flip the switch", 20, 20);

  // top right
  if (mouseX > width / 2 && mouseY < height / 2) {
    topLeft();
  }
  // top left
  else if (mouseX < width / 2 && mouseY < height / 2) {
    topRight();
  }
  // bottom left
  else if (mouseX > width / 2 && mouseY > height / 2) {
    bottomLeft();
  }
  // bottom right
  else {
    bottomRight();
  }
  drawCenterLine();
  drawHorizontalLine();

  function drawCenterLine() {
    // This function will turn stroke on, draw the line, and then turn stroke
    // back off.
    // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
    stroke(textColor);
    line(width / 2, 0, height / 2, height);
    noStroke();
  }

  function drawHorizontalLine() {
    stroke(textColor);
    line(0, height / 2, width, height / 2);
    noStroke();
  }

  function topRight() {
    drawCenterLine();
    drawHorizontalLine();
    backgroundColor = color1;
    textColor = color2;
  }

  function topLeft() {
    drawCenterLine();
    drawHorizontalLine();
    backgroundColor = color2;
    textColor = color3;
  }

  function bottomRight() {
    drawCenterLine();
    drawHorizontalLine();
    backgroundColor = color3;
    textColor = color4;
  }
  function bottomLeft() {
    drawCenterLine();
    drawHorizontalLine();
    backgroundColor = color4;
    textColor = color1;
  }
}
