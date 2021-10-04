import 'nothing.ts'
const WIDTH = 150
const HEIGHT = 150
const SCALE = 2
let seed;

function makeSprite(pixels: string, width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  let x = 0;
  let y = -1; // because we start with a new line before data


  for (let char of pixels.split("")) {
    if (char == "\n") {
      y++;
      x = 0;
      continue;
    }

    let color = "transparent";
    if (char !== " ") {
      const index = +("0x" + char)
      color = getColor(index)
    }

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    x++
  }

  return canvas
}



function getColor(i: number) {
  return "#"+((i*seed)%900+100)
}





const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.style.background = "black"
canvas.width = WIDTH
canvas.height = HEIGHT
canvas.style.width = WIDTH * SCALE +'px'
canvas.style.height = HEIGHT * SCALE + 'px'
canvas.style.imageRendering = 'pixelated'

let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false






function showPalette() {
  const palImage = makeSprite(`
01234567
89abcdef`, 8, 2)
  ctx.drawImage(palImage, 0, 0, WIDTH, HEIGHT)
}

function go() {
  seed = +(document.querySelector('#seed').value);
  document.querySelector('#seedSpot').innerHTML = seed
  showPalette()
}

document.querySelector("#goButton").onclick = go;

go()