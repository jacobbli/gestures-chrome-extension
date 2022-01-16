chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse('handshake complete')
})

const html = document.querySelector('html')
