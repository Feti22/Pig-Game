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

export default roll;