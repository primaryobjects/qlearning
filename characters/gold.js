var Constants = require('../utility/constants');
var Character = require('./character');

class Gold extends Character {
  constructor(x = 0, y = 0, value = 1) {
    super(x, y, 'G', Constants.type.TREASURE);

    this.value = value;
  }
}

module.exports = Gold;