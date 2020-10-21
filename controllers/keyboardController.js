var readlineSync = require('readline-sync');
var Constants = require('../utility/constants');
var Controller = require('../controllers/controller');

//
// Allows keyboard input for moving the player via z (left), x (right), q (quit).
//
class KeyboardController extends Controller {
  constructor(game) {
    super(game);

    console.log('\n-=-= How to Play =-=-');
    console.log('Controls: Z = Left, X = Right, Q = Quit');
    console.log('Characters: P = Player, G = Gold, H = Hotdog');
    console.log('Get the gold, avoid the hotdog!');
    console.log('-=-=-=-=-=-=-=-=-=-=-\n');
  }

  move() {
    var direction = null;

    var key = readlineSync.keyIn('', { hideEchoBack: true, mask: '', limit: 'zxq' });
    switch (key) {
      case 'q': break;
      case 'z': direction = Constants.direction.LEFT; break;
      case 'x': direction = Constants.direction.RIGHT; break;
    }

    return direction;
  }
}

module.exports = KeyboardController;