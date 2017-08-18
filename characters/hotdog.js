var Constants = require('../utility/constants');
var Character = require('./character');

class Hotdog extends Character {
  constructor(x = 0, y = 0, value = 1) {
    super(x, y, 'H', Constants.type.ENEMY);

    this.value = value;
  }
}

module.exports = Hotdog;