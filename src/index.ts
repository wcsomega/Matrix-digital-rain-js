import { Glyph, Raindrop } from "./Glyph.js";
import { randomChar, random, randomInt } from "./utils.js";

let glyphs = [];

const canvasEl = document.querySelector('#canvas') as HTMLCanvasElement;
const context = canvasEl.getContext("2d");
canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

const w = canvasEl.width;
const h = canvasEl.height;

let cols = Math.ceil(w/25);
let rows = Math.ceil(h/32);

context.font = 'bold 30px monospace';
context.textBaseline = 'top';
context.scale(-1, 1);
context.translate(-w, 0);

// context.fillStyle = 'blue';
// context.beginPath()
// context.arc(w/2, h/2, 5, 0, Math.PI*2);
// context.fill();


for(let i = 0; i < cols; i++) {
  glyphs[i] = [];
  for(let j = 0; j < rows; j++) {
    glyphs[i][j] = {
      timeSinceBirth: 0,
      character: randomChar(),
      alive: false,
    }
  }
}

let raindrops = [];

function onUpdate() {

  if(random(0, 1) < 0.5) {
    raindrops.push(new Raindrop(randomInt(0, cols)));
  }

  raindrops.forEach(drop => { drop.onUpdate(glyphs, rows) });
  raindrops = raindrops.filter(drop => !drop.shouldDelete);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let g = glyphs[i][j];
      g.timeSinceBirth++;
      if (g.timeSinceBirth > g.lifetime) {
        g.alive = false;
      }
    }
  }
  // console.log('onupdate');
}

function onDraw() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, w, h);



  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      drawGlyph(context, glyphs[i][j], i * 25, j * 32);
    }
  }
  // requestAnimationFrame(onDraw);
}

// let alpha = 0;
// let white = 0;

function drawGlyph(context: CanvasRenderingContext2D, glyph: Glyph, x: number, y: number) {
  if (glyph.alive) {
    // if(glyph.timeSinceBirth < 4) {
    //   context.fillStyle = 'white';
    // } else if(glyph.timeSinceBirth < 30) {
    //   context.fillStyle = 'lime';
    // } else {
    //   context.fillStyle = 'green';
    // }
    let alpha = 1 - (glyph.timeSinceBirth / glyph.lifetime);
    let white = 12 * (18 - glyph.timeSinceBirth);
    context.fillStyle = `rgba(${white}, 255, ${white}, ${alpha})`;
    // context.fillStyle = 'lime';
    context.fillText(glyph.character, x, y);
  }
}

function gameLoop() {
  onUpdate();
  onDraw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);