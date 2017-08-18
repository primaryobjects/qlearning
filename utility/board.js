var Constants = require('../utility/constants');

class Board {
  constructor(width=Constants.width, height=Constants.height) {
    this.width = width;
    this.height = height;
    this.objects = [];
  }

  add(character) {
    if (character.x >= 0 && character.x < this.width && character.y >= 0 && character.y < this.height) {
      // Character is in bounds, safe to insert.
      this.objects.push(character);
    }
    else {
      throw 'Invalid character position: ' + character.toString(true) + '. Board size is width=' + this.width + ', height=' + this.height +'.';
    }
  }

  player() {
    var player = this.objects.filter(obj => { return obj.type === Constants.type.PLAYER });
    return player.length ? player[0] : null;
  }

  update() {
    // Find the player.
    var player = this.player();

    if (player) {
      // Find any objects in the same cell as the player and notify the player object of the collision.
      var objects = this.objects.filter(obj => { return obj.isAlive && obj !== player && obj.x === player.x && obj.y === player.y });
      objects.forEach(obj => player.collide(obj));
    }
  }

  toString() {
    var result = '';

    // Draw the board.
    for (var y=0; y<this.height; y++) {
      for (var x=0; x<this.width; x++) {
        var objectsInPosition = this.objects.filter(obj => { return obj.x === x && obj.y === y });

        // Display the first character on this spot.
        result += objectsInPosition.length ? (objectsInPosition[0].toString() || '.') : '.';
      }

      result += y < this.height - 1 ? '\n' : '';
    }

    return result;
  }
}

module.exports = Board;