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

export default hold;