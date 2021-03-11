const scoreTxt = document.querySelector('.score span');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let score = 0;

const boxSize = 20;

const colorSnakeHead = 'green';
const colorSnakeBody = 'limegreen';
const colorFood = 'blue';
const backgroundColor = 'black';

let activeKey;
let randomFoodX;
let randomFoodY;

const randomFoodPosition = () => {
  randomFoodX = Math.floor((Math.random() * canvas.width) / boxSize) * boxSize;
  randomFoodY = Math.floor((Math.random() * canvas.height) / boxSize) * boxSize;
};

const snakeArray = [{ x: 20, y: 20 }];

function game() {
  scoreTxt.textContent = score;
  let snakeX = snakeArray[0].x;
  let snakeY = snakeArray[0].y;

  if (activeKey === 'UP') {
    snakeY -= boxSize;
  }
  if (activeKey === 'DOWN') {
    snakeY += boxSize;
  }
  if (activeKey === 'LEFT') {
    snakeX -= boxSize;
  }
  if (activeKey === 'RIGHT') {
    snakeX += boxSize;
  }

  (function background() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 400, 400);
  })();

  let newSnakeArray = {
    x: snakeX,
    y: snakeY,
  };

  (function snake() {
    snakeArray.forEach((item, index) => {
      ctx.fillStyle = index == 0 ? colorSnakeHead : colorSnakeBody;
      ctx.fillRect(item.x, item.y, boxSize, boxSize);
    });
  })();

  (function snakeRand() {
    if (newSnakeArray.x > canvas.width || newSnakeArray.x < 0) {
      newSnakeArray.x > canvas.width ? (newSnakeArray.x = 0) : (newSnakeArray.x = canvas.width);
    }
    if (newSnakeArray.y > canvas.height || snakeArray[0].y < 0) {
      newSnakeArray.y > canvas.height ? (newSnakeArray.y = 0) : (newSnakeArray.y = canvas.height);
    }
  })();

  (function foodRandom() {
    ctx.fillStyle = colorFood;
    ctx.fillRect(randomFoodX, randomFoodY, boxSize, boxSize);

    if (randomFoodX === snakeX && randomFoodY === snakeY) {
      score++;
      randomFoodPosition();
    } else {
      snakeArray.pop();
    }
  })();

  snakeArray.unshift(newSnakeArray);
  //LOG
  // console.log(activeKey, snakeX, snakeY, snakeArray[0].x, snakeArray[0].y);
  // console.log(score);
}

document.addEventListener('keydown', keyDownEvent);

function keyDownEvent(e) {
  if (e.key === 'ArrowUp' && activeKey !== 'DOWN') {
    activeKey = 'UP';
  }
  if (e.key === 'ArrowDown' && activeKey !== 'UP') {
    activeKey = 'DOWN';
  }
  if (e.key === 'ArrowLeft' && activeKey !== 'RIGHT') {
    activeKey = 'LEFT';
  }
  if (e.key === 'ArrowRight' && activeKey !== 'LEFT') {
    activeKey = 'RIGHT';
  }
}
randomFoodPosition();
setInterval(game, 1000 / 6);
