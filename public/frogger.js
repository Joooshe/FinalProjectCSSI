/* global p5 */

// DO NOT DELETE THIS LINE
const p = new p5(() => {});

let DEFAULT_RADIUS;

p.setup = function () {
  DEFAULT_RADIUS = 36;

  p.createCanvas(600, 400);
  p.background(51);

  //Saves the socket as a connection to port 3000 on the io object
    //also triggers the io.socket.connection function in the server
  socket = io.connect('http://localhost:3000');

  //We only declare socket.on in set up because once the socket is on
  //that's it. The socket is on and continuously looking for the name 'mouse'
  //in order to call the method new drawing
  socket.on('mouse', newDrawing)
}

function newDrawing(data) {
  //p.noStroke();
  p.fill(255, 0, 100);
  p.ellipse(data.x, data.y, DEFAULT_RADIUS);
}

p.mouseDragged = function() {
  console.log('Sending: ' + p.mouseX + ', ' + p.mouseY);

  //When you want to send a message to the server you must create a
  //javascript object with the data for that message and a name for that data 
    //here the name is 'mouse' and the data we send is called 'data' object
    var data = {
      x: p.mouseX, 
      y: p.mouseY
    }
  socket.emit('mouse', data);

  //p.noStroke();
  p.fill(255);
  p.ellipse(p.mouseX, p.mouseY, DEFAULT_RADIUS);
}

p.draw = function() {
  
}



/*
let backgroundColor, score, lives, gameIsOver, car1X, car1Y, car1V;
let slowV, medV, fastV, listV;
let car1, car2, car3, carList;
let frogX, frogY, frogR;
let invincibleP, fasterP, teleportP, listP;

p.setup = function () {
  // Canvas & color settings
  p.createCanvas(500, 500);
  p.colorMode(p.HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = p.random(p.width);
  frogY = p.random(p.height - p.height / 15);
  frogR = 20;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  
  slowV = 2;
  medV = 5;
  fastV = 8;
  listV = [slowV, medV, fastV];
  
  invincibleP = {
                 "power" : "invincible",
                 "shape" : "rect",
                 "color" : 240
  };
  
  fasterP = "faster";
  teleportP = "teleport";
  listP = [invincibleP, fasterP, teleportP];
  
  car1 = {
    "x" : 0,
    "y" : p.width * 0.2,
    "v" : slowV,
    "width" : 40,
    "height": 30,
    "color" : 0
  };
  
  car2 = {
    "x" : 0,
    "y" : p.width * 0.4,
    "v" : medV,
    "width" : 40,
    "height": 30,
    "color" : 0
  };
  
  car3 = {
    "x" : 0,
    "y" : p.width * 0.6,
    "v" : medV,
    "width" : 40,
    "height": 30,
    "color" : 0
  };
  
  carList = [car1, car2, car3];
  
}

p.draw = function () {
  p.background(backgroundColor);
  // Code for gold goal line
  p.fill(60, 80, 80);
  p.rect(0, 0, p.width, p.height/10);
  // Code to display Frog
  p.fill(120, 80, 80);
  p.ellipse(frogX, frogY, 20);
  checkLoss();
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  
}

function keyPressed() {
  if (p.keyCode === p.UP_ARROW) {
    frogY -= 10;
  } else if (p.keyCode === p.DOWN_ARROW) {
    frogY += 10
  }
  
  if (p.keyCode === p.RIGHT_ARROW && frogX < p.width) {
    frogX += 10;
  } else if (p.keyCode === p.LEFT_ARROW && frogX > 0) {
    frogX -= 10;
  }
}

function increaseChallenge() {
  let v;
  
  for(v of listV) {
    v+=score/4;
  }
}

function createPowerUps() {
  
}

function moveFrog() {
  frogY += p.height / 15;
}

function moveCars() {
  // Move the car
  let car;
  
  for(car of carList) {
    car["x"] += car["v"];
  }
  // Reset if it moves off screen

}

function drawCars() {
  // Code for car 1
  let car;
  
  for(car of carList) {
    p.fill(car["color"], 80, 80);
    p.rect(car["x"], car["y"], car.width, car.height);
    
    if(car["x"] >= p.width) {
      car["x"] = 0 - car.width;
      car["y"] = p.random(p.height - p.height / 12);
    }
    
  }
  
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  let car;
  
  for(car of carList) {
    if(p.collideRectCircle(car.x, car.y, car.width, car.height, frogX, frogY, frogR)) {
      lives--;
      resetFrog();
    } 
  }

}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  let winCollision = p.collideRectCircle(0, 0, p.width, p.height / 20, frogX, frogY, frogR);
  
  if(winCollision) {
    score++;
    resetFrog();
  }
  
  if(score >= 5) {
    p.textSize(48);
    p.fill(0);
    p.text(`YOU WIN`, p.width/2 - p.width / 8,  p.height / 2);
    p.noLoop();
  }
}

function checkLoss() {
  if(lives <= 0) {
    p.noLoop();
  }
}

function resetFrog() {
  frogX = p.random(p.width);
  frogY = p.height - p.height / 20;
}

function displayScores() {
  p.textSize(12);
  p.fill(0);
  // Display Lives
  p.text(`Lives: ${lives}`, 10, 20);
  // Display Score
  p.text(`Score: ${score}`, p.width - p.width/10, p.height / 25);
  // Display game over message if the game is over

}
*/