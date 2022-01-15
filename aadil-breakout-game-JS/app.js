// getting appropriate element.

const showRule = document.querySelector('.show-rule-btn');
const closeRule = document.querySelector('.close-rule-btn');
const leftSlider = document.querySelector('.left-slider');
const gameCanvas = document.querySelector('.game-area');

showRule.addEventListener('click', () => {
  leftSlider.style.transform = "translateX(0)";
});

closeRule.addEventListener('click', () => {
  leftSlider.style.transform = "translateX(-100%)";
});


// first create a circle  (done.)
// make it bounce back from the edges (done.)
// create a bar at the bottom. (done.)
// make it move in only horizontal direction (done.)
// make the ball only bouce of from the bar. (done.)
// create bricks. (done.)

// make bricks disapear when the ball touches them. (done.)
// make all the bricks reapear once the ball hit the bottom. (done.)
// keep the score. (done.)

//  code for the game starts here.
const ctx = gameCanvas.getContext('2d');
// ball properties
const ball = {
  x: gameCanvas.width / 2,
  y: gameCanvas.height / 2,
  size: 3,
  dx: 1,
  dy: 1
}
// playBar properties
const Bar = {
  x: gameCanvas.width / 2,
  y: gameCanvas.height - 5,
  width: 25,
  height: 3,
  dx: 5,
  dy:0
}
// keep the statistics
const gameStats = {
  score: 0,
  text: "bricks poped!!",
  x: gameCanvas.width - 30,
  y: 10
}
// the brick properties
function brick(x,y, visibility) {
  this.x = x;
  this.y = y;
  this.visibility = visibility;
}
const bricks = {
  x: 7,
  y: 20,
  width: 20,
  height: 5,
  columns: 13,
  rows: 5,
  space: 2
}

const Allbricks = [];
for(let i = 0; i < bricks.rows; i ++) {
  const row = [];
  for(let j = 0; j < bricks.columns; j++) {
    row.push(new brick(bricks.x, bricks.y, true));
    bricks.x += bricks.width + bricks.space;
  }
  Allbricks.push(row);
  bricks.x = 7;
  bricks.y += bricks.height + bricks.space;
}

// this will display all bricks no matter what! use it when player has lost.
function displayAllBricks() {
  gameStats.score = 0;
  Allbricks.forEach((row) => {
    row.forEach((column) => {
      column.visibility = true;
      ctx.beginPath();
      ctx.rect(column.x, column.y,
              bricks.width, bricks.height);
      ctx.fillStyle = "#0095dd";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// this will display only non-touched bricks
function displayNonTouchedBricks() {
  Allbricks.forEach((row) => {
    row.forEach((column) => {
      ctx.beginPath();
      ctx.rect(column.x, column.y,
              bricks.width, bricks.height);
      ctx.fillStyle = column.visibility ? "#0095dd" : "transparent";  
      ctx.fill();
      ctx.closePath();
    });
  });
}

// check if the ball has touched the brick
function checkIfTouched() {
  
  Allbricks.forEach((row) => {
    row.forEach((column) => {
      // check 
      if(column.visibility) {
        if((
          ball.x - ball.size >= column.x &&
          ball.x + ball.size <= column.x + bricks.width &&
          ball.y - ball.size <= column.y + bricks.height &&
          ball.y + ball.size >= column.y
        )) {
          console.log('hit');
              ball.dy *= -1;
              column.visibility = false;  
              gameStats.score += 1;
          }
      }
    });
  });
}

function showGameStats() {
  ctx.font = "5px Arial, Helvetica, sans-serif";
  ctx.fillStyle = "#0095dd";
  ctx.textAlign = "center";
  ctx.fillText(`${gameStats.text}    ${gameStats.score}`, gameStats.x, gameStats.y);
}

function createBall() {
  
  // creating ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function createBar() {

    // creating Bar
    ctx.beginPath();
    ctx.rect(Bar.x, Bar.y, Bar.width, Bar.height);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

// these funcitons make movements

// move the ball
function moveBall() {
  // ctx.beginPath();
  ball.x += ball.dx;
  ball.y += ball.dy;
  // border detection 
  // for the bottom and the top.
  if(ball.y + ball.size >= gameCanvas.height ||
     ball.y - ball.size <= 0) {
    ball.dy *= -1;
  }
  // for left and right.
  if(ball.x + ball.size >= gameCanvas.width ||
    ball.x - ball.size <= 0) {
   ball.dx *= -1;
  } 
}

// move the bar.
function moveBar(e) {
  if(e.key === "ArrowLeft") {
    moveBarLeft();
  }
  if(e.key === "ArrowRight") {
    moveBarRight();
  }
}
function moveBarLeft () {
  // 5 just because it was going a bit out side of the widht
  if(Bar.x >= 5) {
    Bar.x -= Bar.dx;
  }
}
function moveBarRight () {
  // 5 just because it was going a bit out side of the widht.
  if(Bar.x + Bar.width <= gameCanvas.width - 5) {
    Bar.x += Bar.dx;
  }
}


// make ball only bounce of when hit the bar.
function bounceFromBar() {

  // it checks if the ball has hit the ground 
  if((ball.x + ball.size < Bar.x ||
    ball.x + ball.size > Bar.x + Bar.width) &&
    ball.y + ball.size >= gameCanvas.height) {
      displayAllBricks();
    }
  // if the ball touchs the bar
  if(ball.x - ball.size >= Bar.x &&
     ball.x + ball.size <= Bar.x + Bar.width &&
     ball.y + ball.size === Bar.y) {
       ball.dy *= -1;
  }
}

// adding evet listener on to the keyup. 
document.addEventListener('keydown', moveBar);

function updateScreen() {

  ctx.clearRect(0,0,  gameCanvas.width, gameCanvas.height);

  showGameStats();
  moveBall();
  bounceFromBar();
  checkIfTouched();
  displayNonTouchedBricks();
  createBall();
  createBar();
  requestAnimationFrame(updateScreen);
}
updateScreen();
