Q-Learning
==========

A simple game implementing [Q-learning](https://en.wikipedia.org/wiki/Q-learning) artificial intelligence.

## What is Q-Learning?

Q-Learning is a reinforcement learning technique, used in artificial intelligence. Q-learning allows you to find an optimal action for a given particular state.

#### AI with no training

![Controlling the player with an untrained AI](images/qlearning-1.gif)

In the above screenshot, the AI controlling the player ('P') has not yet been trained. Notice the large number of random moves that the computer makes, randomly moving left and right until it gets lucky and reaches the gold ('G').

#### AI with 1,000 points of training

![Controlling the player with an AI after 1,000 points of training](images/qlearning-2.gif)

In the above screenshot, the AI ('P') has been trained with q-learning for 1,000 points of training. Notice the difference in the intelligence of the player movements. The AI has learned to move the player in the direction of the gold ('G'), optimally scoring points in each round.

## How to Play?

Modify `app.js` and set the desired controller on line 19, as shown below.

#### Play by keyboard

```js
var controller = new KeyboardController(game);
```

Controls

```text
Z = Left
X = Right
Q = Quit
```

Characters

```text
P = Player
G = Gold
H = Hotdog
```

#### Auto-play by the AI

Enable Q-learning for training, as shown below. After the AI trains for 10,000 points, the game will slow down to view the game plays.

```js
var controller = new QController(game, 49999999);
```

## The Game

To demonstrate applying q-learning, this project includes a simple game. The game consists of a set of 10 cells, with an enemy (the hotdog 'H'), a player (the chef 'P'), and a treasure item (the gold 'G').
*The game was inspired by the arcade classic Burger Time, but bares little resemblence!*

An example of the game board is shown below.

```text
..H..G...P
```

The goal of the game is simply to collect the treasure. Each time the player ('P') moves to the gold ('G'), they score 1 point. If they move onto the hotdog ('H'), they lose 1 point.

When the player collects a gold item, the gold is repositioned randomly on the board. If the player hits an enemy, the enemy is repositioned randomly on the board.

The player can move the character by pressing 'x' or 'z'.

## Controllers

Several simple controllers exist to allow manually controlling the player or allowing a game AI to move the player. The following controllers are available:

- [KeyboardController](controllers/keyboardController.js)
  A keyboard based controller, allows a user to manually move the player with the keyboard.
- [OneDirectionController](controllers/oneDirectionController.js)
  A "dumb" AI controller that simply always moves the player left or right until a wall is hit, regardless of where the enemy or gold are positioned.
- [SmartController](controllers/smartController.js)
  An optimal AI controller that moves left if the gold is left of the player and right if the gold is right of the player.
- [QController](controllers/qController.js)
  A q-learning AI controller that learns which moves to make according to the current state of the game. This controller effectively learns to behave in the same manner as the SmartController, which is the optimal scenario.

## Q-Learning Algorithm

The main q-learning calculation updates a table of game states, with values for each available action. Each state consists of the following parts:

- Player X
- Player Y
- Gold X
- Gold Y

At each state, the following actions are available:

- LEFT
- RIGHT

Based upon the state and available actions, the q-learning algorithm updates a table of values for each action at the given state, optimizing the values to choose the best action for that state. The main [code](controllers/qController.js#L67) for this calculation is shown below.

```js
this.table[oldState][this.last.action] = this.table[oldState][this.last.action] +
        this.learningRate *
        (reward +
          (this.discount * max) - this.table[oldState][this.last.action]
        );
```

## License

MIT

## Author

Kory Becker

http://www.primaryobjects.com/kory-becker
