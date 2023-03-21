//******************************************************************************************************
//functies
//checken of er gelijkspel is
function checkDraw() {
  if (!document.querySelectorAll(".cells:not(.disabled)").length == true) {
    console.log("draw triggered");
    //alert("draw!");
    document.querySelector(".gameover").style.display = "block";
    document.querySelector(".gameover-text").textContent = "draw";
  }
}

// checken of er een winnaar is
function checkWin() {
  game.WinningCombination.forEach(WinningCombination => {
    const xWins = WinningCombination.every(state => game.XState.includes(state));
    const OWins = WinningCombination.every(state => game.OState.includes(state));

// zorgen dat het spel de juiste gameover text laat zien
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
//***************************************************************************************************** 
//eind functies

// start condities en win condities
const game = {
  xTurn: true,
  XState: [],
  OState: [],
  // winnende combinaties
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
let currentTurn = document.querySelector(".currentTurn")
currentTurn.textContent = "X"

// klikken op vakjes functionaliteit geven
document.addEventListener("click", event => {
  // constanten rond vakjes vastleggen
  const target = event.target;
  const isCell = target.classList.contains("cells");
  const isDisabled = target.classList.contains("disabled");
// controle of vakje al bezet is
  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;
    // controle wie aan de beurt is
    game.xTurn === true ?
      game.XState.push(cellValue) :
      game.OState.push(cellValue);
    target.classList.add("disabled");
    target.classList.add(game.xTurn ? "X" : "O");
    // speler wisselt hier
    game.xTurn = !game.xTurn;
    currentTurn.textContent = game.xTurn ? "X" : "O";
    console.log(!document.querySelectorAll(".cells:not(.disabled)").length);
  }
  checkDraw()
  checkWin()
});

// reset knop laten werken
document.querySelector(".restart").addEventListener("click", event => {
  document.querySelector(".gameover").style.display = "none"
  document.querySelectorAll(".cells").forEach(cell => {
    cell.classList.remove('disabled', "X", "O")
  })
  game.xTurn = true
  game.XState = []
  game.OState = []
  currentTurn.textContent = "X"
})