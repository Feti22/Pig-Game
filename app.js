import roll from "./roll";
import hold from "./hold";

const gameState = {
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function reset() {
  gameState.activePlayer = 1;
  gameState.dice.die1 = 1;
  gameState.dice.die2 = 1;
  gameState.scores.player1Total = 0;
  gameState.scores.player2Total = 0;
  gameState.scores.player1Round = 0;
  gameState.scores.player2Round = 0;

  updateUI();
}

function updateUI() {
  const { activePlayer, scores, dice } = gameState;
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

function swapActivePlayer() {
  gameState.activePlayer === 1
    ? (gameState.activePlayer = 2)
    : (gameState.activePlayer = 1);
}

function checkWin() {
  if (gameState.scores[`player${gameState.activePlayer}Total`] >= 100) {
    return true;
  }
  return false;
}

document.querySelector('.btn-new').addEventListener('click', reset);
document.querySelector('.btn-roll').addEventListener('click', roll);
document.querySelector('.btn-hold').addEventListener('click', hold);
reset();
