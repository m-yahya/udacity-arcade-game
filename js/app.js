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

// level counter
let level = 1;

var Player = function(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  // enabling left key movement
  if (key == 'left' && this.x > 0) {
    this.x -= 101;
  }
  // enabling right key movement
  if (key == 'right' && this.x < 400) {
    this.x += 101;
  }
  // enabling up key
  if (key == 'up' && this.y > 0) {
    this.y -= 83;
  }
  // enabling down key
  if (key == 'down' && this.y < 400) {
    this.y += 83;
  }
  // reset player position once reached on the top
  if (this.y < 0) {
    level++;
    setTimeout(() => {
      this.resetPosition();
    }, 1000);
  }

  // reset level counter
  if (level > 5) {
    level = 1;
  }
};

// reset player position
Player.prototype.resetPosition = function() {
  this.x = 200;
  this.y = 405;
  document.getElementById('level-counter').innerHTML = level;
};

// update
Player.prototype.update = function() {
  for (let enemy of allEnemies) {
    if (this.x < enemy.x + 80 &&
      this.x + 80 > enemy.x &&
      this.y < enemy.y + 70 &&
      this.y + 70 > enemy.y) {
      level = 1;
      this.resetPosition();
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
const enemy1 = new Enemy(0, 60, 100);
const enemy2 = new Enemy(0, 150, 150);
const enemy3 = new Enemy(0, 230, 200);
//const enemy4 = new Enemy(100, 100, 250);
allEnemies.push(enemy1, enemy2, enemy3);

// Place the player object in a variable called player
const player = new Player(200, 405);

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
