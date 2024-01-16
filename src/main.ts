import './style.css';
import mWalkPath from './assets/005-Fighter05.png';

const canvas = document.getElementById('game') as HTMLCanvasElement | null;

if (!canvas) throw new Error('Canvas not found');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const ctx = canvas.getContext('2d');

const moveCount = 4;

const spriteOffsetX = 32;
const spriteOffsetY = 48;

const heroWidth = 64;
const heroHeight = 64;

let positionX = 0;
let positionY = 0;

let direction = 0;
let step = 0;

let keyDown = false;

let lastTimeUpdate = 0;

function animate(timestamp: number) {
  const deltaTime = timestamp - lastTimeUpdate;
  if (ctx) {
    const img = new Image();
    img.src = mWalkPath;
  
    img.onload = function() {
      
        if (keyDown) {
          step = (step + 0.01 * deltaTime) % moveCount;

          if (direction === 0) {
            positionY += 0.1 * deltaTime; 
          } else if (direction === 1) {
            positionX -= 0.1 * deltaTime;
          } else if (direction === 2) {
            positionX += 0.1 * deltaTime;
          } else if (direction === 3) {
            positionY -= 0.1 * deltaTime;
          }
  
          if (positionX < 0) {
            positionX = 0;
          } else if (positionY > CANVAS_WIDTH - heroWidth) {
            positionY = CANVAS_WIDTH - heroWidth;
          } else if (positionY < 0) {
            positionY = 0;
          } else if (positionX > CANVAS_HEIGHT - heroHeight) {
            positionX = CANVAS_HEIGHT - heroHeight;
          }
        }

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(img, spriteOffsetX * Math.floor(step), spriteOffsetY * direction, 
          spriteOffsetX, spriteOffsetY, positionX, positionY, heroHeight, heroWidth);
    }
  }
  
  lastTimeUpdate = timestamp;
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event: KeyboardEvent) {
  keyDown = true;

  switch(event.key) {
    case 'ArrowUp':
    case 'Up': {
      direction = 3;
      break;
    }
    case 'ArrowRight':
    case 'Right': {
      direction = 2;
      break;
    }
    case 'ArrowDown':
    case 'Down': {
      direction = 0;      
      break;
    }
    case 'ArrowLeft':
    case 'Left': {
      direction = 1;
      break;
    }
  }
}

function keyUpHandler() {
  keyDown = false;
  direction = 0;
  step = 0;
}
