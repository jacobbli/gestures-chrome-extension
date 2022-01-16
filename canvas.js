const canvas = document.createElement("canvas");
const context = canvas.getContext('2d');

canvas.id = 'gesture__canvas'
canvas.style =
  `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: 5px pink solid;
    z-index: 10000;
  `

canvas.height = html.clientHeight;
canvas.width = html.clientWidth;
canvas.addEventListener('contextmenu', event => event.preventDefault());

function showCanvas() {
  html.appendChild(canvas);
}

function removeCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height)
  const element = document.querySelector('#gesture__canvas')
  if (element) html.removeChild(canvas)
}


function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}