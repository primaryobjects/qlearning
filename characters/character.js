var Constants = require('../utility/constants');

class Character {
  constructor(x = 0, y = 0, symbol = '?', type = Constants.type.NEUTRAL) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.type = type;
    this.isAlive = true;
  }

  move(direction = Constants.direction.LEFT) {
    switch (direction) {
      case Constants.direction.LEFT: this.x--; break;
      case Constants.direction.RIGHT: this.x++; break;
      default: this.x--; break;
    }

    if (this.x < 0) {
      this.x = 0;
    }
    else if (this.x > Constants.width - 1) {
      this.x = Constants.width - 1;
    }

    if (this.y < 0) {
      this.y = 0;
    }
    else if (this.y > Constants.height - 1) {
      this.y = Constants.height - 1;
    }    
  }

  position(x, y) {
    this.x = x;
    this.y = y;
  }

  toString(isVerbose = false) {
    return this.isAlive ? (this.symbol + (isVerbose ? (' (x=' + this.x + ',y=' + this.y + ')') : '')) : '';
  }
}

module.exports = Character;