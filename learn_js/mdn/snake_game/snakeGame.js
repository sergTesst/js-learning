import getCanvasAndContext from "./getContext.js";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const { canvas, context: ctx } = getCanvasAndContext("snakeBoard");
ctx.imageSmoothingEnabled = true;

window.setInterval(gameLoop, 1000 / 10);

const timerElement = document.getElementById("game-time");
let startDate = new Date();
const pointsElement = document.getElementById("points-count");
let count = 0;

const grid = 16;
const minimumGridValue = 0;
const maximumGridValue = canvas.height / grid;

let snake = {
  x: 160,
  y: 160,

  //snake speed
  dx: grid,
  dy: 0,

  //keep track of all grids the snake body occupies
  cells: [],

  snakeLength: 1,
};

const food = {
  x: 320,
  y: 320,
};

function gameLoop() {
  startTime();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  moveSnake();

  wrapSnakeOnItsCurrentDirection();

  keepTrackOfSnakeCells();

  drawFood();

  drawSnake();
}

function startTime() {
  let date = new Date();
  timerElement.innerText = `minutes ${Math.abs(date.getMinutes() - startDate.getMinutes())}, seconds: ${Math.abs(
    date.getSeconds() - startDate.getSeconds()
  )}, milliseconds: ${Math.abs(date.getMilliseconds() - startDate.getMilliseconds())}`;
}

function moveSnake() {
  snake.x += snake.dx;
  snake.y += snake.dy;
}

function wrapSnakeOnItsCurrentDirection() {
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
}

function keepTrackOfSnakeCells() {
  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.snakeLength) {
    snake.cells.pop();
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.cells.forEach(drawSeparateSnakeCell);

  function drawSeparateSnakeCell(cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    checkIfSnakeCollideFood();

    function checkIfSnakeCollideFood() {
      if (cell.x === food.x && cell.y === food.y) {
        snake.snakeLength++;

        ++count;

        pointsElement.innerText = `${count}`;

        resetFoodPosition(food);
      }
    }

    checkIfSnakeCollideItSelf();

    function checkIfSnakeCollideItSelf() {
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          resetTimeAndPoints();
          resetSnakePosition(snake);
          resetFoodPosition(food);
        }
      }
    }

    function resetTimeAndPoints() {
      startDate = new Date();
      count = 0;
    }

    function resetSnakePosition(snake) {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.snakeLength = 1;
      snake.dx = grid;
      snake.dy = 0;
    }

    function resetFoodPosition(food) {
      food.x = getRandomInt(minimumGridValue, maximumGridValue) * grid;
      food.y = getRandomInt(minimumGridValue, maximumGridValue) * grid;
    }
  }
}

document.addEventListener("keydown", function (e) {
  e.preventDefault();

  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
