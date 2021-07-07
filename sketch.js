var leftShip;
var rightShip; 
var allDebris = [];
var win;


const NUM_DEBRIS = 30;


var leftScore; 
var rightScore;

var spaceshipImage; 

var timer;
function setup() {
  createCanvas(400, 400);
  

  spaceshipImage = loadImage('spaceship.png');
  win=loadSound('mixkit-achievement-bell-600.wav')
  
  
  leftShip = new Ship(width * 0.33, spaceshipImage);
  rightShip = new Ship(width * 0.66, spaceshipImage);
  
  for (let i = 0; i < NUM_DEBRIS; i++) {
  	allDebris.push(new Debris());
  }

  
  // creating the score objects
  leftScore = new Score(width * 0.33 - 40);
  rightScore = new Score(width * 0.66 + 40);

  timer = new Timer();

  
}

function draw() {
  background(0);
  
  leftShip.update();
  rightShip.update();
  
  leftShip.display();
  rightShip.display();
  
  updateDebrisAndCheckCollisions();
  
  
  // pass in the players current score
  leftScore.display(leftShip.score);
  rightScore.display(rightShip.score);
  
  timer.display();
  
  if (timer.y >= height) {
  	noLoop();
  }
}



function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
  	allDebris[i].display();
    
    if (allDebris[i].hasHitShip(leftShip)) {
    	leftShip.respawn();
    } else if (allDebris[i].hasHitShip(rightShip)) {
    	rightShip.respawn();
    }
  }
}


function keyPressed() {
	if (keyCode == UP_ARROW) {
  	rightShip.isUp = true;
    rightShip.isDown = false;
  } else if (keyCode == DOWN_ARROW) {
  	rightShip.isDown = true;
    rightShip.isUp = false;
  }
  
  
  if (keyCode == 87) {
  	// keycode is 'w'
    leftShip.isUp = true;
    leftShip.isDown = false;
  } else if (keyCode == 83) {
  	// keycode is 's'
    leftShip.isDown = true;
    leftShip.isUp = false;
  }
}


function keyReleased() {
	if (keyCode == UP_ARROW) {
  	rightShip.isUp = false;
  } else if (keyCode == DOWN_ARROW) {
  	rightShip.isDown = false;
  }
  
  if (keyCode == 87) {
    leftShip.isUp = false;
  } else if (keyCode == 83) {
    leftShip.isDown = false;
  }
}


