let initialX = 0
let initialY = 0
let finalX = 0
let finalY = 0

let velocityTimerId = 0

let sequence = []
let isHeldDown = false
const TIMER_DURATION = 100



document.addEventListener('mousedown', (e) => {
  if (e.button === 1) isHeldDown = false
})

document.addEventListener('mouseup', (e) => {
  if (isHeldDown) onGestureEnd()
})

document.addEventListener('mousedown', onMouseDown)

async function onMouseDown(event) {
  if (event.button === 2) {
    isHeldDown = true
    document.addEventListener('mousemove', onGestureStart, { once: true })
    document.addEventListener('mousemove', updatePos)
  }
}

function onGestureStart(event) {
  if (isHeldDown) {
    initialX = event.clientX;
    initialY = event.clientY;
    finalX = initialX;
    finalY = initialY;

    document.addEventListener('contextmenu', event => event.preventDefault(), { once: true });

    velocityTimerId = setInterval(() => {
      getGesture();
      initialX = finalX;
      initialY = finalY;
    }, TIMER_DURATION)

    showCanvas();
  }
}

function onGestureEnd() {
  removeCanvas()
  document.removeEventListener('mousemove', updatePos)
  clearInterval(velocityTimerId)
  performAction()
  sequence = []
  isHeldDown = false
}

function updatePos(event) {
  finalX = event.clientX;
  finalY = event.clientY
}


function getGesture() {
  const direction = getDirection(finalX, finalY, TIMER_DURATION)
  if (direction && direction !== sequence.at(-1)) sequence.push(direction)

}

function getDirection(currentX, currentY, elapsedTime) {
  const horizontalVelocity = getVelocity(initialX, currentX, elapsedTime)
  const verticalVelocity = getVelocity(initialY, currentY, elapsedTime)

  if (horizontalVelocity >= 1.5) return 'right'
  if (horizontalVelocity <= -1.5) return 'left'

  if (verticalVelocity >= 1.5) return 'down'
  if (verticalVelocity <= -1.5) return 'up'
}

function getVelocity(initialPos, finalPos, elapsedTime) {
  return ((finalPos - initialPos) / elapsedTime)
}


