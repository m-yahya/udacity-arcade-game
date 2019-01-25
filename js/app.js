// Enemies our player must avoid
var Enemy = function(_x, _y, _speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = _x;
  this.y = _y;
  this.speed = _speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;

  // reset enemy if crossed the boundary
  if (this.x > 505) {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.x = 200;
  this.y = 380;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(0, 60, 100);
const enemy2 = new Enemy(0, 150, 150);
const enemy3 = new Enemy(0, 230, 200);
const enemy4 = new Enemy(100, 100, 250);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// Place the player object in a variable called player
const player = new Player();

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
