const canvas = document.querySelector("canvas");
const score = document.querySelector(".score_value");
const ctx = canvas.getContext("2d"); //ctx = contexto

//Menu perdedor
const finalScore = document.querySelector(".final_score > span");
const menu = document.querySelector(".menu_Screen");
const buttonPlay = document.querySelector(".btn_play");
const endGame = document.querySelector(".game_over");

const size = 50;
const initialPosition = { x: 400, y: 400 };
let snake = [initialPosition];

let direction;

const playNote = () => {
  const audio = new Audio(`./assets/audio.mp3`);
  audio.play();
};

const drawSnake = () => {
  ctx.fillStyle = "#ddd";
  snake.forEach((position, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "white";
    }
    ctx.fillRect(position.x, position.y, size, size);
  });
};

const pointer = [
  {
    x: Math.floor(Math.random() * 16) * 50,
    y: Math.floor(Math.random() * 16) * 50,
  },
];

const drawPointer = () => {
  const positionPointer = pointer[pointer.length - 1];
  ctx.fillStyle = "red";
  ctx.fillRect(positionPointer.x, positionPointer.y, size, size);
};

const addScore = () => {
  const snakeHead = snake[snake.length - 1];
  const positionPointer = pointer[pointer.length - 1];
  if (positionPointer.x == snakeHead.x && snakeHead.y == positionPointer.y) {
    score.innerText = +score.innerText + 10;
    if (score.innerText <= 190) {
      snake.unshift({ x: -1, y: -1 });
    }

    positionPointer.x = Math.floor(Math.random() * 16) * 50;
    positionPointer.y = Math.floor(Math.random() * 16) * 50;

    while (
      snake.find(
        (position) =>
          position.x == positionPointer.x && position.y == positionPointer.y
      )
    ) {
      positionPointer.x = Math.floor(Math.random() * 16) * 50;
      positionPointer.y = Math.floor(Math.random() * 16) * 50;
    }
    playNote();
  }
};

const endGames = () => {
  direction = undefined;
  menu.style.display = "flex";
  finalScore.innerText = score.innerText;
  canvas.style.filter = "blur(4px)";
};

const checkStats = () => {
  const head = snake[snake.length - 1];
  const neckIndex = snake.length - 2;
  const selfCollision = snake.find((position, index) => {
    return (
      (index < neckIndex && position.x == head.x && position.y == head.y) ||
      head.x < 0 ||
      head.x > 750 ||
      head.y < 0 ||
      head.y > 750
    );
  });
  if (selfCollision) {
    endGames();
    endGame.innerText = "Você Perdeu!";
  }
  if (score.innerText == 350) {
    endGames();
    endGame.innerText = "Você Ganhou!";
  }
};

const moveSnake = () => {
  if (!direction) return;
  const head = snake[snake.length - 1];

  if (direction == "right") {
    snake.push({ x: head.x + size, y: head.y });
  }
  if (direction == "down") {
    snake.push({ x: head.x, y: head.y + size });
  }
  if (direction == "left") {
    snake.push({ x: head.x - size, y: head.y });
  }
  if (direction == "top") {
    snake.push({ x: head.x, y: head.y - size });
  }
  snake.shift();
};
setInterval(() => {
  ctx.clearRect(0, 0, 800, 800);
  checkStats();
  moveSnake();
  drawSnake();
  drawPointer();
  addScore();
}, 100);

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 65 && direction != "right") {
    direction = "left";
  } else if (e.keyCode == 83 && direction != "top") {
    direction = "down";
  } else if (e.keyCode == 68 && direction != "left") {
    direction = "right";
  } else if (e.keyCode == 87 && direction != "down") {
    direction = "top";
  }
});
buttonPlay.addEventListener("click", () => {
  score.innerText = "00";
  menu.style.display = "none";
  canvas.style.filter = "none";
  snake = [initialPosition];
});
