/* Manual
It takes a few seconds before the game starts and loads all files

Press '1' for regular arrow key movement
Press '2' for visual movement

//Visual movement
- Raise your right hand vertical for right movement
- Raise your left hand vertical for left movement
- Raise your hand horizontal above your head for up movement
- Raise your hand horizonatal below your head for down movement

Press 'v' to display your video
Press 'n' to 'hide' your video

*/

let backgroundColor, playerSnake, currentApple, score, currentApple2, currentApple3, gameState;
let classifier, video, label, show, controller;
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/j9mfM_bQ3/';

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  img = loadImage('snakeBg.jpg');
  snakeApple =loadImage('snakeApple.png')
  play = loadImage('playbutton.png')
  }


function setup() {
  createCanvas(450, 450);
  // Create the video
  video = createCapture(VIDEO);
  video.size(450, 450);
  video.hide();
  flippedVideo = ml5.flipImage(video)
  classifyVideo();
  loadImage('snakeBg.jpg', imageLoaded);
  loadImage('snakeApple.png', imageLoaded);
  image(img, 0, 0);
  image(snakeApple, 0, 0);
  show = false
  controller = true
  gameState = 'intro'
  createCanvas(450, 450);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(10);
  playerSnake = new Snake();
  currentApple = new Apple();
  currentApple2 = new Apple();
  currentApple3 = new Apple();
  score = 0;


}



function draw() {
  image(img, 0,0,width,height); 

  if (gameState === 'intro'){
    fill('black')
    textSize(45)
    text("Matrix snake", (width/2)-120, 150  )
    image(play, (width/2)-100, 200,200,100)
    
  }
 
  if (gameState === 'playing'){
  let flippedVideo = ml5.flipImage(video);
  
  


  gController();
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  

  currentApple.showSelf();
  currentApple2.showSelf();
  currentApple3.showSelf();
  displayScore();
  showVideo(show);

  }
}

function displayScore() {
  fill("Black");
  textSize(20);
  text(`Score: ${score}`, 40, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)];
  }
  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
      if (this.y < 0){
        this.x = this.x
        this.y = height
      }
    } else if (this.direction === "S") {
      this.y += this.speed;
      if (this.y > height){
        this.x = this.x
        this.y = 0
      }
    } else if (this.direction === "E") {
      this.x += this.speed;
      if(this.x > width){
        this.x = 0
        this.y = this.y
      }
    } else if (this.direction === "W") {
      this.x -= this.speed;
      if(this.x < 0){
        this.x = width
        this.y = this.y
      }
    } else {
      console.log("Error: invalid direction");
    }
    
    this.tail.unshift(new TailSegment(this.x, this.y));
    this.tail.pop();
  }

  showSelf() {
    noStroke();
    // stroke(240, 100, 100);
    for (let segment of this.tail) {
      segment.showSelf();
    }
  }

  checkApples() {
    let hit = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple.x,
      currentApple.y,
      currentApple.size,
      currentApple.size,
    );
     let hit2 = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple2.x,
      currentApple2.y,
      currentApple2.size,
      currentApple2.size,
    );
     let hit3 = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,
      currentApple3.x,
      currentApple3.y,
      currentApple3.size,
      currentApple3.size,
    );
    if (hit) {
      score++;
      // how to move the apple?
      currentApple = new Apple();
      this.extendTail();
    }
    if (hit2) {
      score++;
      currentApple2 = new Apple();
      this.extendTail();
    }
    if (hit3) {
      score++;
      currentApple3 = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {
    if (this.tail.length > 1) {
      for (let i = 1; i < this.tail.length; i++) {
        let segment = this.tail[i];
        if (this.x == segment.x && this.y == segment.y) {
          gameOver();
        }
      }
    }
  }

  extendTail() {
    let segment = new TailSegment(this.x, this.y);
    this.tail.push(segment);
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  showSelf() {
    fill('yellow')
    rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    this.size = 13;
    this.x = random(width - this.size);
    this.y = random(height - this.size);
  }

  showSelf() {
    image(snakeApple,this.x, this.y, this.size, this.size);
  }
}

function cameraMovement(){
  textSize(32)
  fill('Black')
  textAlign(CENTER, CENTER)
  text(label, width/2, height - 16);
  if (label == 'Right' && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (label == 'Left' && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else if (label == "Up" && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (label == 'Down' && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  }
}

function keyPressed() {
  
   if (keyCode === 32){
    score = 0
    currentApple = new Apple();
    currentApple2 = new Apple();
    currentApple3 = new Apple();
    playerSnake = new Snake()
  }
  
  if (keyCode === 86){
    show = true
  }
  if (keyCode === 78){
    show = false
  }
  if (keyCode === 49){
    controller = true
  }
  if (keyCode === 50){
    controller = false
  }
}

function gotResults(error, results){
  if (error){
    console.error(error);
    return;
  }
  label = results[0].label
  classifyVideo();
}
   
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(video, gotResults);
}
  
function imageLoaded() {
  image(img, 0, 0);
  image(snakeApple, 0,0)
}

function showVideo(show){
  if (show === true){
  image(flippedVideo, 350, 0, 100, 100);}
  if(show === false){
   image(flippedVideo, 450, 0, 100, 100);
  }
}
function gController(){
  if (controller === true){
     console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
    
  }
  if (controller === false){
    cameraMovement();
  }
}
function mouseClicked(){
  if (mouseX < 400 && mouseY > 200){
    gameState = 'playing'
  }
}

function gameOver() {
  text("GAME OVER", 50, 50);
  noLoop();
}



