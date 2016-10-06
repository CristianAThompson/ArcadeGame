//creates a base object that gets defined initial location and sprite image properties

var baseObj= function(x, y, image) {
    //This sprite holds the image data for each instance where basObj is defined
    this.sprite = image;
    this.x = x;
    this.y = y;
};

//creates a random integer based on input values for randomizing enemies
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    //defines the outline for each Enemy entity
    baseObj.call(this, x, y, "images/enemy-bug.png");
    this.constructor = Enemy;
    var rS = getRandomInt(1,4);
    //sets the speed modifer for enemies at random between 1 and 4
    this.speedMod = getRandomInt(1, rS);
    //creates timestamp for enemy function
    var ts = Math.round((new Date()).getTime() /1000);
    //add a random number of seconds to current time to spawn new enemy
    this.friend = ts + getRandomInt(1, 1.5);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //this moves the enemy across the screen
    this.y = this.y + (60 * dt) + this.speedMod;
    //creates timestamp for update function
    var ts = Math.round((new Date()).getTime() / 1000);
    //specifies index length of all enemies array
    var index = allEnemies.length;
    if(this.friend === ts) {
        //create random y for enemy valid rows
        var rY = getRandomInt(0,4);
        //create random time for rX
        var rT = getRandomInt(50, 100);
        //create a random x for enemy
        var rX = getRandomInt(1,2) * rY;
        //add the enemy we create to the empty allEnemies array
        allEnemies.push(new Enemy(validRows[rY], rX));
        //remove the timeStamp from friend so the enemy won't spawn more friends
        this.friend = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// defines the player initial location and sprite calls the constructor.

var Player = function() {
    baseObj.call(this, 0, 154, 'images/char-boy.png');
    this.constructor = Player;
    //specifies the default value to be used later for movement math
    this.moveX = 0;
    this.moveY = 0;
    //the speed to be used to for player movement
    this.speed = 2;


};

//defines what the canvas should render and where for player entity

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(key) {
    // wait until the move variable is false before next move is allowed to begin
    if(this.moveX !== 0 || this.moveY !== 0) {
        return;
    }

    // check the boundry, dont let player go off screen.
    if(this.x>404 && key === 'right') {
        return;
    }
    if(this.x<4 && key === 'left') {
        return;
    }
    if(this.y<-10 && key === 'up') {
        return;
    }
    if(this.y>303 && key === 'down') {
        return;
    }

    // set player movement vars movement up and down 84px, left and right 100px
    if(key === 'up') {
        this.moveY -= 82;
    }
    if(key === 'down') {
        this.moveY += 82;
    }
    if(key === 'left') {
        this.moveX -= 100;
    }
    if(key === 'right') {
        this.moveX += 100;
    }
};

Player.prototype.update = function(dt) {
    // this will move the player a little bit each frame
    if(this.moveX > 0) {
        this.x += this.speed;
        this.moveX -= this.speed;
    }
    if(this.moveX < 0) {
        this.x -= this.speed;
        this.moveX += this.speed;
    }
    if(this.moveY > 0) {
        this.y += this.speed;
        this.moveY -= this.speed;
    }
    if(this.moveY < 0) {
        this.y -= this.speed;
        this.moveY += this.speed;
    }
};

var moveLeft = function() {
  if (player.x > 2) {
    player.moveX -= 100;
  }
};

var moveRight = function() {
  if (player.x < 400) {
    player.moveX += 100;
  }
};

var moveUp = function() {
  if (player.y > -10) {
    player.moveY -= 82;
  }
};

var moveDown = function() {
  if (player.y < 303) {
    player.moveY += 82;
  }
};

var leftButton = document.getElementById('left');
leftButton.onclick = moveLeft;

var rightButton = document.getElementById('right');
rightButton.onclick = moveRight;

var upButton = document.getElementById('up');
upButton.onclick = moveUp;

var downButton = document.getElementById('down');
downButton.onclick = moveDown;

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

var player = new Player();

var allEnemies = [];
var validRows = [101,202,303,404];

allEnemies.push(new Enemy(validRows[0], -20));
