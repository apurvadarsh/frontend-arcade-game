// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Enemy loop
    if (this.x >= 707) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    handleCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // implemented
};

// Draw the player on the screen, required method for game

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayStatus(score, gameLevel, deaths);

};
//Method which should receive user input and move the player according to that input
Player.prototype.handleInput = function(keyCode) {
    if (keyCode == 'left') {
        player.x -= 20;
    }
    if (keyCode == 'up') {
        player.y -= 20;
    }
    if (keyCode == 'right') {
        player.x += 20;
    }
    if (keyCode == 'down') {
        player.y += 20;
    }
    console.log('keyPress is: ' + keyCode + " " + player.x + " " + player.y);
};
//In case of collision, player is resetted
var resetPlayer = function() {
    player.x = 302.5;
    player.y = 483;
};


//Gem Class
var Gems = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/Gem-Orange.png';
};

Gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
var handleCollision = function(anEnemy) {
    // check for collision between enemy and player and increments deaths
    if (
        Math.abs(player.x - anEnemy.x) <= 60 && Math.abs(player.y - anEnemy.y) <= 70) {
        deaths += 1;
        player.x = 302.5;
        player.y = 483;

    }
    //check for collision between gem and player
    //if it occurs, score increases by 20 and gem disappears untill level up
    if (Math.abs(player.x - gem.x) <= 60 && Math.abs(player.y - gem.y) <= 70) {

        score += 20;
        gem.x = -100;
        gem.y = -100;

    }


    // check for player reaching the water level and winning the game
    // if player wins, score increases by 10
    //level up function called

    if (player.y + 60 <= 0) {
        resetPlayer();


        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 10;
        gameLevel += 1;

        levelUp++;
        gem.x = Math.random() * 302 + 20;
        gem.y = Math.random() * 172;
        levelUpCall(levelUp);

    }

    // check if player moves off screen
    // prevent player from moving beyond screen
    if (player.y > 483) {
        player.y = 483;
    }
    if (player.x > 605) {
        player.x = 605;
    }
    if (player.x < 0) {
        player.x = 0;
    }


};

// Level up
var levelUpCall = function(levelUp) {
    // enemy strength reset
    allEnemies.length = 0;

    // number of enemies incremented
    for (var i = 0; i <= levelUp; i++) {
        var enemy = new Enemy(0, Math.random() * 300 + 23, Math.random() * 171);

        allEnemies.push(enemy);
    }
};

// Function to display player's score
var displayStatus = function(score, gameLevel, deaths) {
    var canvas = document.getElementsByTagName('canvas');
    var canvasTag = canvas[0];


    scoreBox.innerHTML = 'Level: ' + gameLevel + ' | ' + 'Score: ' + score + ' | ' + 'Deaths: ' + deaths;
    document.body.insertBefore(scoreBox, canvasTag[0]);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var player = new Player(302.5, 483, 50);
var score = 0;
var gameLevel = 1;
var scoreBox = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 300 + 23, Math.random() * 171);
var gem = new Gems(Math.random() * 302 + 20, Math.random() * 172, 50);
var levelUp = 1;
var deaths = 0;
allEnemies.push(enemy);



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
    console.log(allowedKeys[e.keyCode]);
});