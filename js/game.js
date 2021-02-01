'use strict';
const WALL = '🧱';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🍌';
const CHERRY = '🍒';
var gHasWon = false;
var gCurrNumsOfFood = 56;
var gNumOfCherry = 0;
var gCherryInterval;
var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gCherryInterval = setInterval(addCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    1;
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
      } else if ( // move outside the loop and do it manually
        (i === 1 && j === 1) ||
        (i === 8 && j === 1) ||
        (i === 1 && j === 8) ||
        (i === 8 && j === 8)
      ) {
        board[i][j] = POWER_FOOD;
      }
    }
  }

  return board;
}

// update model and dom
function updateScore(diff) {
  gGame.score += diff;
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

// TODO
function gameOver() {
  console.log('gameOver');

  gGame.isOn = false;
  clearInterval(gCherryInterval);
  gCherryInterval = null;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  showMsg();
}
function showMsg() {
  var elMsg = document.querySelector('.Msg');
  var msgcontent = gHasWon ? 'VICTORY! ! !' : 'Never mind, you can try again';
  elMsg.innerHTML = msgcontent;
  document.querySelector('.modal-container').classList.remove('hide');
}

function restart() {
  console.log('restart');
  document.querySelector('.Msg').innerHTML = '';
  document.querySelector('.modal-container').classList.add('hide');
  // move to init
  gCurrNumsOfFood = 56;
  gGame.score = 0;
  updateScore(0);
  gHasWon = false;
  init();
}

function addCherry() {
  var isFound = false;
  // move to getEmptyCell
  while (!isFound) { 
    var coord = {
      i: getRandomIntInclusive(1, 8),
      j: getRandomIntInclusive(1, 8),
    };

    isFound = isEmptyCell(coord);
    if (gCurrNumsOfFood + gNumOfCherry === 56) return;
  }
  gBoard[coord.i][coord.j] = CHERRY;
  // TODO: update the DOM
  gNumOfCherry++;
  renderCell(coord, CHERRY);
}
