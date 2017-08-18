var readlineSync = require('readline-sync');
var Constants = require('../utility/constants');
var Controller = require('../controllers/controller');

//
// Moves right or left depending upon location of treasure to the player.
//
class SmartController extends Controller {
  constructor(game, speed) {
    super(game);

    this.speed = speed;
    this.direction = Constants.direction.RIGHT;
  }

  move() {
    var player = this.game.player();
    var gold = this.game.objects.filter(obj => { return obj.isAlive && obj.type === Constants.type.TREASURE; });
    gold = gold.length ? gold[0] : null;

    if (gold) {
      // Move in the direction of the treasure.
      this.direction = player.x < gold.x ? Constants.direction.RIGHT : Constants.direction.LEFT;
    }

    for (var i=0; i<this.speed; i++) { }

    return this.direction;
  }
}

module.exports = SmartController;