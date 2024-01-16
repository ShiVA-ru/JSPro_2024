import './style.css';
import mWalkPath from './assets/M-walk.png';

const canvas = document.getElementById('game') as HTMLCanvasElement | null;

if (!canvas) throw new Error('Canvas not found');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const ctx = canvas.getContext('2d');

const shots = 3;

let keyPress = false;
let direction = 0;

let characterX = 0;
let characterY = 0;



let lastTimeUpdate = 0;
let step = 0;

function animate(timestamp: number) {
  const deltaTime = timestamp - lastTimeUpdate;

  if (ctx) {
    const img = new Image();
    img.src = mWalkPath;
  
    img.onload = () => {
      if (keyPress) {
        step = (step + 0.01 * deltaTime) % shots;
        
        if (direction === 0) {
          characterY += 0.1 * deltaTime;
        } else if (direction === 1) {
          characterX -= 0.1 * deltaTime;
        } else if (direction === 2) {
          characterX += 0.1 * deltaTime;
        } else if (direction === 3) {
          characterY -= 0.1 * deltaTime;
        }

        if (characterX < 0) {
          characterX = 0;
        } else if (characterX > CANVAS_WIDTH - 64) {
          characterX = CANVAS_WIDTH - 64;
        }

        if (characterY < 0) {
          characterY = 0;
        } else if (characterY > CANVAS_HEIGHT - 64) {
          characterY = CANVAS_HEIGHT - 64;
        }

      }
      
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(img, 48 * Math.floor(step), 48 * direction, 48, 48, characterX, characterY, 64, 64);
      
    }
  }

  lastTimeUpdate = timestamp;
  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate)

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
    case 'Up':
      keyPress = true;
      direction = 3;
      break;
    case 'ArrowRight':
    case 'Right':
      keyPress = true;
      direction = 2;
      break;
    case 'ArrowDown':
    case 'Down':
      keyPress = true;
      direction = 0;
      break;
    case 'ArrowLeft':
    case 'Left':
      keyPress = true;
      direction = 1;
      break;
  }
}

function keyUpHandler() {
  keyPress = false;
  direction = 0;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);