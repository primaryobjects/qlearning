var Constants = require('../utility/constants');
var Character = require('./character');

class Player extends Character {
  constructor(x = 0, y = 0, onScore, onDamage, onStatus) {
    super(x, y, 'P', Constants.type.PLAYER);

    this.onScore = onScore;
    this.onDamage = onDamage;
    this.onStatus = onStatus;
  }

  collide(object) {
    var message = '';

    switch (object.type) {
      case Constants.type.ENEMY: {
        message = object.symbol + ' hits you!';
        this.onDamage(object, object.value);
      }
      break;
      case Constants.type.TREASURE:
      case Constants.type.NEUTRAL: {
        message = 'You find ' + object.symbol + '.';
        this.onScore(object, object.value);
      }
      break;
      case Constants.type.PLAYER: message = 'You find another player ' + object.symbol + '.'; break;
    }

    this.onStatus(message);
  }
}

module.exports = Player;