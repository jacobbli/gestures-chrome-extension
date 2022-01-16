const gestures = {
  'right': () => history.forward(),
  'left': () => history.back(),
  'down right': () => closeTab(false),
  'down left': () => closeTab(),
  'up right': () => switchTab(false),
  'up left': () => switchTab()

}

function switchTab(left = true) {
  chrome.runtime.sendMessage({ action: "switchTab", moveLeft: left });
}

function closeTab(moveLeft = true) {
  chrome.runtime.sendMessage({ action: "closeCurrentTab", moveLeft: moveLeft });
}


function performAction() {
  const sequenceString = sequence.join(' ');
  const action = gestures[sequenceString];
  if (action) action();
}