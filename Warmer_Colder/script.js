/* global createCanvas, colorMode, random, HSB, width, height, background, ellipse, mouseX, mouseY, text, 
fill, rect, keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, collideRectCircle, noStroke,
HSL, windowWidth, windowHeight, line, sqrt, round, color, CENTER, textAlign, image, loadImage, time */


// hover over start button to start :)


let backgroundColor, end, circlePosition, rectPosition, mousePosition;
let score;
let gameState = "intro";
let iBackground, start;
let start_timer = 3000;

function setup() {
  // Canvas & color settings
  time = start_timer;
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 0;
  iBackground = loadImage(
    "https://cdn.glitch.com/fd929c22-3134-422f-a774-a139faf8de17%2Fgamebg.png?v=1627344799192"
  );
  start = loadImage(
    "https://cdn.glitch.com/fd929c22-3134-422f-a774-a139faf8de17%2FstartUI.png?v=1627344807238"
  );
  end = loadImage('https://cdn.glitch.com/fd929c22-3134-422f-a774-a139faf8de17%2Fgammmover.png?v=1627346382854')
  
  score = 0;

  // This variable contains a JSON object
  circlePosition = {
    x: 100,
    y: 100
  };

  rectPosition = {
    x: 130,
    y: 140
  };
}

function draw() {
  //
  if (gameState === "intro") {
    image(iBackground, 0, 0, width, height);
    image(start, 160, 200, 200, 90);
    if (mouseX > 160 && mouseX < 260 && mouseY > 200 && mouseY < 250) {
      gameState = "playing";
    }
  }

  if (gameState === "playing") {
    handleTime();
    background(backgroundColor);
    textAlign(CENTER, CENTER);
    fill(backgroundColor + 2);
    textSize(50);
    text(score, width / 2, height / 2);
    textSize(15);
    text(time, width / 2, height / 2 - 40);

    mousePosition = {
      x: mouseX,
      y: mouseY
    };

    // let distanceCircleMouse = computeDistance(circlePosition, mousePosition);
    let categoryMessage = computeCategory(circlePosition, mousePosition);
    text(`${categoryMessage}`, width / 2, height / 2 + 40);
  }

  if (gameState === "end") {
    image(iBackground, 0, 0, width, height);
    image(end, 150, 100, 200, 200) 
    textSize(12);
    text(`Score: ${score}`, width / 2, height / 2 + 120);
  }
}

function computeDistance(point1, point2) {
  let deltaX = point1.x - point2.x;
  let deltaY = point1.y - point2.y;
  let distance = sqrt(deltaX ** 2 + deltaY ** 2);
  return distance;
}

function computeCategory(point1, point2) {
  let exactDistance = computeDistance(point1, point2);
  if (exactDistance > 200) {
    backgroundColor = color(220, 40, 100);
    return "Brrrrr";
  } else if (exactDistance > 100) {
    backgroundColor = color(260, 40, 100);
    return "I'm still chilly";
  } else if (exactDistance > 20) {
    backgroundColor = color(300, 40, 100);
    return "Getting warmer...";
  } else {
    backgroundColor = color(0, 40, 100);
    return "Red Hot!";
  }
}

function mousePressed() {
  if (computeDistance(circlePosition, mousePosition) < 20) {
    circlePosition.x = random(width);
    circlePosition.y = random(height);
    score++;
    time += 100;
  }
}

function handleTime() {
  if (time > 0) {
    time = round(time - 1);
  } else {
    gameState = "end";
  }
}
