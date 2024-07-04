//  game variable
let inputdir = { x: 0, y: 0 };
let eatsound = new Audio('music/eat.mp3.wav');
let directionsound = new Audio('music/direction.mp3.wav');
let backgroundsound = new Audio('music/background.mp3');
let hitsound = new Audio('music/hit.mp3.wav');
let lastpainttime = 0;
let speed = 5;
let score = document.getElementById("score");
let num = 0;
let board = document.getElementById("board");
let snakearr = [
  { x: 13, y: 15 }
]
let food = { x: 6, y: 7 };

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  highScore = 0;
  localStorage.setItem("highScore", highScore);
} else {
  highScore = parseInt(highScore);
}
highScoreBox.innerHTML = " " + highScore;



// game functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastpainttime) / 1000 < 1 / speed) {
    return;
  }
  lastpainttime = ctime;
  gameEngine();
  
}
function iscollide(snake) {
  // if you hit yourself 
  for (let index = 1; index < snakearr.length; index++) {
    if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
      return true;
    }
  } 
  // if you hit with the wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
  
    return true;
  }
}

function gameEngine() {
  // part 1: udate the snake array and food
  if (iscollide(snakearr)) {
    hitsound.play();
    backgroundsound.pause();
    inputdir = { x: 0, y: 0 };
    alert("gameover pree enter to play again");
    if (num > highScore) {
      highScore = num;
      localStorage.setItem("highScore", highScore);
      highScoreBox.innerHTML = " " + highScore;
    }
    snakearr = [{ x: 13, y: 15 }];
    num = 0;

  }

  // if the snake eat the food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    num++;
    score.innerHTML = " " + num;
    eatsound.playbackRate = 10.5;
    eatsound.play();
    snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
    let a = 2;
    let b = 16;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
  }
  // moveing the snake 
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };

  }
  snakearr[0].x += inputdir.x;
  snakearr[0].y += inputdir.y;


  // part 2 ; display the snake and food
  // display the display
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    let snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;
    board.appendChild(snakeelement);
    if (index === 0) {
      snakeelement.classList.add("headss");

    } else {
      snakeelement.classList.add("snakebody");
    }
  })
  // display the food
  let snakefood = document.createElement("div");
  snakefood.style.gridRowStart = food.y;
  snakefood.style.gridColumnStart = food.x;
  snakefood.classList.add("food");
  board.appendChild(snakefood);
};

// main logic starts here

window.requestAnimationFrame(main);

document.addEventListener("keydown", function (e) {
  inputdir = { x: 0, y: 0 }// start the game
  backgroundsound.play();
  directionsound.playbackRate = 15.50;
  switch (e.key) {
    case "ArrowUp":
      directionsound.play();
      inputdir.x = 0;
      inputdir.y = -1;
      break
    case "ArrowDown":
      directionsound.play();
      inputdir.x = 0;
      inputdir.y = 1;
      break
    case "ArrowLeft":
      directionsound.play();
      inputdir.x = -1;
      inputdir.y = 0;
      break
    case "ArrowRight":
      directionsound.play();
      inputdir.x = 1;
      inputdir.y = 0;
      break
    default:
      break;
  }
});