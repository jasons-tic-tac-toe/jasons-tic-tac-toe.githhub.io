const game = {
  xTurn: true,
  XState: [],
  OState: [],
  WinningCombination: [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ]
}

// const gameboard = document.getElementById(gameboard);

document.addEventListener("click", event => {
  const target = event.target;
  const isCell = target.classList.contains("cells");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;
    game.xTurn === true ?
      game.XState.push(cellValue) :
      game.OState.push(cellValue);
    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "X" : "O");
    game.xTurn = !game.xTurn;
    console.log(!document.querySelectorAll(".cells:not(.disabled)").length);
  }
  checkDraw()
  checkWin()
});

function checkDraw() {
  if (!document.querySelectorAll(".cells:not(.disabled)").length == true) {
    console.log("draw triggered");
    //alert("draw!");
    document.querySelector(".gameover").style.display = "block";
    document.querySelector(".gameover-text").textContent = "draw";
  }
}

function checkWin() {
  game.WinningCombination.forEach(WinningCombination => {
    const xWins = WinningCombination.every(state => game.XState.includes(state));
    const OWins = WinningCombination.every(state => game.OState.includes(state));


    if (xWins || OWins) {
      console.log("win triggered");
      document.querySelectorAll("cells").forEach(cell => cell.classList.add("disabled"));
      document.querySelector(".gameover").style.display = "block";

      document.querySelector(".gameover-text").textContent = xWins ?
        "X wins" :
        "O wins";
    }
  })
}
document.querySelector(".restart").addEventListener("click", event => {
  document.querySelector(".gameover").style.display = "none"
  document.querySelectorAll(".cells").forEach(cell => {
    cell.classList.remove('disabled', "X", "O")
  })
  game.xTurn = true
  game.XState = []
  game.OState = []
  //console.log("restart triggered")
  //alert("restart")
})