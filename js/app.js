"use strict";
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.offScreenX = 505;
  this.startingX = -100;
  //Coordinates in the canvas used to draw the enemy
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Speed is used so that every enemy has a random speed.
  this.x = this.x + this.speed * 50 * dt;
  //If the enemy goes offScreen, then it returns to the startPoint
  if(this.x > this.offScreenX) {
    this.x = this.startingX;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks if this enemy collides with the player using the algorithm from
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkIfCollidesWithPlayer = function() {
  //These two variables represents the area occupied by enemy and player
  var playerArea = {x: player.x, y: player.y, width: 50, height: 40};
  var enemyArea = {x: this.x, y: this.y, width: 60, height: 70};
  // Check for collisions, if playerBox intersects enemyBox, we have one
  if (playerArea.x < enemyArea.x + enemyArea.width &&
    playerArea.x + playerArea.width > enemyArea.x &&
    playerArea.y < enemyArea.y + enemyArea.height &&
    playerArea.height + playerArea.y > enemyArea.y) {
      player.reset();
    }
  };

  //This is the Player class, representing the player
  var Player = function() {
    this.sprite = 'images/char-boy.png';
    //Coordinates in the canvas used to draw the player
    this.x = 202;
    this.y = 373.5;
  };

  //Reset the player to the initial position
  Player.prototype.reset = function() {
    this.x = 202;
    this.y = 373.5;
  };

  //For the basic game can be empty
  Player.prototype.update = function() {

  };

  //Draw the player on the canvas
  Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  //This function is used to update player coordinates in canvas according to the
  //pressed key. It also performs some check, to avoid player going off screen
  Player.prototype.handleInput = function(direction) {
    switch (direction) {
      case 'up':
      this.y = this.y - 83;
      if(this.y+83 < 0) {
        alert("You won");
        this.reset();
      }
      break;
      case 'down':
      if(this.y + 83 <= 373.5)
      this.y = this.y + 83;
      break;
      case 'left':
      if(this.x - 101 >= 0)
      this.x = this.x - 101;
      break;
      case 'right':
      if(this.x + 101 < 505)
      this.x = this.x + 101;
      break;
      default:

    }
  };

  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player
  const player = new Player();
  const allEnemies = [
    new Enemy(0, 50.5, Math.random()*10+1),
    new Enemy(-300, 50.5 + 83, Math.random()*10 + 1),
    new Enemy(-200, 50.5 + 83*2, Math.random()*10 + 1),
    new Enemy(-400, 50.5 + 83*3, Math.random()*10 + 1)
  ];


  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
