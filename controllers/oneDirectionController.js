var readlineSync = require('readline-sync');
var Constants = require('../utility/constants');
var Controller = require('../controllers/controller');

//
// Moves in one direction until a wall is hit and then switches direction.
//
class OneDirectionController extends Controller {
  constructor(game, speed) {
    super(game);

    this.speed = speed;
    this.direction = Constants.direction.RIGHT;
  }

  move() {
    var player = this.game.player();

    switch (this.direction) {
      case Constants.direction.RIGHT: if (player.x + 1 > this.game.width - 1) { this.direction = Constants.direction.LEFT; } break;
      case Constants.direction.LEFT: if (player.x - 1 < 0) { this.direction = Constants.direction.RIGHT; } break;
    }

    for (var i=0; i<this.speed; i++) { }

    return this.direction;
  }
}

module.exports = OneDirectionController;