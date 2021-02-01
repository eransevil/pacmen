'use strict';
const GHOST = '&#9781;';

var gGhosts;
var gIntervalGhosts;
// TODO
var gId = 101;
function createGhost(board) {
  var ghost = {
    isDied: false,
    id: gId++,
    location: {
      i: 2,
      j: 4,
    },
    color: generateRandomColor(),
    currCellContent: FOOD,
  };
  gGhosts.push(ghost);
  board[ghost.location.i][ghost.location.j] = GHOST;
}

// 3 ghosts and an interval
function createGhosts(board) {
  gGhosts = [];
  createGhost(board);
  createGhost(board);
  createGhost(board);
  gIntervalGhosts = setInterval(moveGhosts, 1000);
}

// TODO: loop through ghosts
function moveGhosts() {
  for (var i = 0; i < gGhosts.length; i++) {
    var currGhost = gGhosts[i];
    moveGhost(currGhost);
  }
}
function moveGhost(ghost) {
  if (gPacman.isSuper && ghost.isDied) return;
  // figure out moveDiff, nextLocation, nextCell
  var moveDiff = getMoveDiff();
  // console.log(moveDiff);
  var nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  };
  var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
  // TODO: return if cannot move
  if (nextCellContent === WALL) return;
  if (nextCellContent === GHOST) return;

  // TODO: hitting a pacman?  call gameOver
  if (nextCellContent === PACMAN) {
    gameOver();
    return;
  }

  // TODO: update the model
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
  // TODO: update the DOM
  renderCell(ghost.location, ghost.currCellContent);
  // TODO: Move the ghost
  ghost.location = { i: nextLocation.i, j: nextLocation.j };
  ghost.currCellContent = nextCellContent;
  // TODO: update the model
  gBoard[nextLocation.i][nextLocation.j] = GHOST;
  // TODO: update the DOM
  var ghostWithColor = addColorToGhost(ghost);
  renderCell(nextLocation, ghostWithColor);
}

function getMoveDiff() {
  var randNum = getRandomIntInclusive(0, 100);
  if (randNum < 25) {
    return { i: 0, j: 1 };
  } else if (randNum < 50) {
    return { i: -1, j: 0 };
  } else if (randNum < 75) {
    return { i: 0, j: -1 };
  } else {
    return { i: 1, j: 0 };
  }
}

function addColorToGhost(ghost) { // getColoredGhost
  var color;
  if (!gPacman.isSuper) { // use short if
    color = ghost.color;
    //   console.log(color);
  } else {
    color = '#A9A9A9';
  }
  var HtmlGhost = `<span style="color:${color};">&#9781; </span> `;
  return HtmlGhost;
}

//   var color = !gPacman.isSuper ? ghost.color : '#A9A9A9';
//   var HtmlGhost = `<span style="color:${color};">&#9781; </span> `;
//   console.log(color)
//   return HtmlGhost;
// }

// if(gPacman.isSuper===false){
//     var color = ghost.color;
// }else{
//     var color = '#A9A9A9'
// }
