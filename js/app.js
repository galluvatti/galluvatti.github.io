// Enemies our player must avoid
var Enemy = function(x, y) {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  //Coordinates in the canvas used to draw the enemy
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + 101 * dt;
};

Enemy.prototype.getX = function() {
  return this.x;
}

Enemy.prototype.getY = function() {
  return this.y;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This is the Player class, representing the player
var Player = function() {
  this.sprite = 'images/char-boy.png';
  //Coordinates in the canvas used to draw the player
  this.x = 202;
  this.y = 373.5;
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 373.5;
};

Player.prototype.update = function() {
  for(enemy of allEnemies) {
    if(this.x === enemy.getX() && this.y === enemy.getY())
      ctx.init();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This function is used to update player coordinates in canvas according to the
//pressed key. It also performs some check, to avoid player going off screen
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'up':
    this.y = this.y - 83;
    if(this.y < 0)
    this.reset();
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
  new Enemy(0, 50.5),
  new Enemy(-300, 50.5 + 83),
  new Enemy(-600, 50.5 + 83),
  new Enemy(-200, 50.5 + 83*2),
  new Enemy(-400, 50.5 + 83*3),
  new Enemy(-600, 50.5 + 83),
  new Enemy(-900, 50.5 + 83),
  new Enemy(-1000, 50.5 + 83*2),
  new Enemy(-800, 50.5 + 83*3)
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
