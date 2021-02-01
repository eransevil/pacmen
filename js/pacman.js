'use strict';
var PACMAN = `<img style ="width:25px; height:25px" src="/img/pacman.png">`; // move style to css
var gPacman;
var gMyTimeOut;
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // TODO: return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === FOOD) {
    updateScore(1);
    gCurrNumsOfFood--;
    console.log(gCurrNumsOfFood);
    if (!gCurrNumsOfFood) {
      gHasWon = true; // send to gameOver instead of keeping a global variable
      gameOver();
    }
  } else if (nextCell === POWER_FOOD) {
    clearTimeout(gMyTimeOut);
    gPacman.isSuper = true;
    gMyTimeOut = setTimeout(function () {
      gPacman.isSuper = false;
    }, 5000);
  } else if (nextCell === CHERRY) updateScore(10);
  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      return;
    }
    // eat a ghost

    for (var i = 0; i < gGhosts.length; i++) {
      if (
        nextLocation.i === gGhosts[i].location.i &&
        nextLocation.j === gGhosts[i].location.j
      ) {
        var currGhost = gGhosts[i];
        currGhost.isDied = true;
        setTimeout(function () {
          currGhost.isDied = true;
        }, 5000);
      }
    }
  }
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);
  // TODO: Move the pacman
  gPacman.location = { i: nextLocation.i, j: nextLocation.j };
  // TODO: update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  // TODO: update the DOM
  renderCell(nextLocation, PACMAN);
}

// figure out nextLocation
function getNextLocation(eventKeyboard) {
  var nextLocation = { i: gPacman.location.i, j: gPacman.location.j };

  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--;
      changePacmanDirc(260);
      break;
    case 'ArrowDown':
      nextLocation.i++;
      changePacmanDirc(90);
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      changePacmanDirc(180);
      break;
    case 'ArrowRight':
      nextLocation.j++;
      changePacmanDirc(0);
      break;
  }
  return nextLocation;
}

function changePacmanDirc(deg) {
  // const PACMAN = `<img style ="width:20px; height:20px" src="/img/pacman.png">`
  PACMAN = `<img style ="transform:rotate(${deg}deg); width:20px; height:20px;"src="/img/pacman.png">`; // move to a class
}
