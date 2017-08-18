var Constants = require('./utility/constants');
var Player = require('./characters/player');
var Hotdog = require('./characters/hotdog');
var Gold = require('./characters/gold');
var Board = require('./utility/board');
var KeyboardController = require('./controllers/keyboardController');
var OneDirectionController = require('./controllers/oneDirectionController');
var SmartController = require('./controllers/smartController');

// Create characters.
var score = 0;
var status = '';

var hotdog = new Hotdog();
var gold = new Gold();
var game = new Board();
var controller = new SmartController(game, 199999999);

var player = new Player(Math.round(Constants.width / 2), 0,
  (object, points) => {
    score += points;
    positionObject(object);
  },
  (object, damage) => {
    score -= damage;
    positionObject(object);
  },
  (msg) => status += msg + ' '
);

// Add characters to game.
game.add(hotdog);
game.add(player);
game.add(gold);

var render = function(game, status = '') {
  process.stdout.clearLine();
  process.stdout.write(game.toString() + ' | Score: ' + score + ' | ' + status + '\r');
}

var random = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive.
}

var positionObject = function(object, min = 0, max = game.width) {
  // Randomly position object.
  object.x = random(min, max);
  while (object.x === player.x) {
    object.x = random(min, max);
  }  
}

// Set object positions.
positionObject(hotdog);
positionObject(gold);

// Initial render.
render(game, status);

// Main game loop.
var done = false;
while (!done) {
  // Move player.
  var direction = controller.move();
  if (direction) {
    player.move(direction);
  }
  else {
    break;
  }

  // Update game state and check collisions.
  game.update();

  // Render.
  render(game, status);

  status = '';
}

