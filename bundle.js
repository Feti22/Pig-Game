function roll() {
  // generate random dice values
  // destructuring assignment
  const { activePlayer, dice, scores } = gameState;

  dice.die1 = getRandomInt(2, 6);
  dice.die2 = getRandomInt(2, 6);
  // update the active player round score
  scores[`player${activePlayer}Round`] += dice.die1 + dice.die2;

  // if either die rolls a 1
  if (dice.die1 === 1 || dice.die2 === 1) {
    // set round score to 0
    scores[`player${activePlayer}Round`] = 0;
    // swap current active player
    swapActivePlayer();
    // alert the "You rolled a 1. Lose your turn!"
    setTimeout(() => {
      alert('You rolled a 1. Lose your turn!');
    }, 250);
  }

  // update the UI
  updateUI();
}

function hold() {
  // add the current player round score to current player total
  // destructuring assignment
  const { scores, activePlayer } = gameState;
  scores[`player${activePlayer}Total`] += scores[`player${activePlayer}Round`];

  // set current player round score to 0
  scores[`player${activePlayer}Round`] = 0;

  // check for a win condition
  if (checkWin()) {
    setTimeout(() => {
      alert(`Player ${activePlayer} Wins!!!`);
    }, 250);
  } else {
    swapActivePlayer();
  }

  // update the UI
  updateUI();
}

const gameState$1 = {
  activePlayer: 1,
  dice: {
    die1: 1,
    die2: 1,
  },
  scores: {
    player1Total: 1,
    player2Total: 0,
    player1Round: 0,
    player2Round: 0,
  },
};

function reset() {
  gameState$1.activePlayer = 1;
  gameState$1.dice.die1 = 1;
  gameState$1.dice.die2 = 1;
  gameState$1.scores.player1Total = 0;
  gameState$1.scores.player2Total = 0;
  gameState$1.scores.player1Round = 0;
  gameState$1.scores.player2Round = 0;

  updateUI$1();
}

function updateUI$1() {
  const { activePlayer, scores, dice } = gameState$1;
  // use the values stored in game state to update the user interface
  const domStrings = {
    scores: {
      player1Total: '#score-0',
      player2Total: '#score-1',
      player1Round: '#current-0',
      player2Round: '#current-1',
    },
    dice: {
      die1: '#dice1',
      die2: '#dice2',
    },
  };

  // update scores
  for (let score in domStrings.scores) {
    document.querySelector(domStrings.scores[score]).textContent =
      scores[score];
  }

  // update dice
  for (let die in domStrings.dice) {
    document.querySelector(domStrings.dice[die]).src = `dice-${dice[die]}.png`;
  }

  // set the active user class
  if (activePlayer === 1) {
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
  } else {
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
  }
}

document.querySelector('.btn-new').addEventListener('click', reset);
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
reset();
