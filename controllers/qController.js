var readlineSync = require('readline-sync');
var Constants = require('../utility/constants');
var Common = require('../utility/common');
var Controller = require('../controllers/controller');

//
// Q-Learning.
//
class QController extends Controller {
  constructor(game, speed) {
    super(game);

    this.speed = speed;
    this.actions = [ Constants.direction.RIGHT, Constants.direction.LEFT ];

    this.learningRate = 0.4; // Q-learning parameter.
    this.discount = 0.7; // Q-learning parameter.
    this.epsilon = 0.9; // A random value must exceed this threshold to pick a random move instead of learned move.
    this.trainingScore = 200000; // Slow the game down for viewing, once the score reaches this value.

    this.table = [];
  }

  initialize() {
    // Initialize Q Table states with random values. A state consists of the player position and treasure position.
    var table = [];
    var treasure = this.game.treasure();

    for (var y=0; y<this.game.height; y++) {
      for (var x=0; x<this.game.width; x++) {
        for (var ty=0; ty<this.game.height; ty++) {
          for (var tx=0; tx<this.game.width; tx++) {
            var state = 'x=' + x + ',y=' + y + ',tx=' + tx + ',ty=' + ty;
            table[state] = {};

            for (var a=0; a<this.actions.length; a++) {
              // Initialize each action to a random value for this state.
              table[state][this.actions[a]] = Math.random();
            }
          }
        }
      }
    }

    return table;
  }

  move() {
    // Update Q Table state for last action.
    // Our new state is the player position.
    var player = this.game.player();
    var treasure = this.game.treasure();
    var state = 'x=' + player.x + ',y=' + player.y + ',tx=' + treasure.x + ',ty=' + treasure.y;

    if (this.last) {
      // Reward is 1 if our score increased, otherwise -1 if our score decreased.
      var reward = this.last.score < this.game.score ? 1 : -1;

      // Get the key for the last state.
      var oldState = 'x=' + this.last.x + ',y=' + this.last.y + ',tx=' + this.last.tx + ',ty=' + this.last.ty;

      // Find the max value for this state.
      var max = Math.max.apply(null, Object.keys(this.table[state]).map((action) => {
        return this.table[state][action];
      }));

      // Evaluate what happened on the last action and update Q table.
      this.table[oldState][this.last.action] = this.table[oldState][this.last.action] +
        this.learningRate * 
        (reward +
          (this.discount * max) - this.table[oldState][this.last.action]
        );
    }
    else {
      // First time running, initialize the q-table with random values.
      this.table = this.initialize();
    }

    /*   
    @q_table[@old_state][@action_taken_index] = @q_table[@old_state][@action_taken_index] + @learning_rate * 
      (r + @discount * @q_table[@outcome_state].max - @q_table[@old_state][@action_taken_index])
    */

    // Choose action based on Q value for state.
    if (Math.random() > this.epsilon) {
      // Select a random action.
      this.action = this.actions[Common.random(0, this.actions.length)];
    }
    else {
      // Select an action based on Q table by finding the maximum value for the state and selecting that action.
      var max = Common.maxInAssocArray(this.table[state]);
      this.action = this.actions[max.index];
    }

    // Capture current state.
    this.last = { x: player.x, y: player.y, tx: treasure.x, ty: treasure.y, score: this.game.score, action: this.action }

    for (var i=0; i<((this.game.score > this.trainingScore) ? this.speed : 0); i++) { }

    return this.action;
  }
}

module.exports = QController;