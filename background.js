chrome.tabs.onActivated.addListener((tab) => {
  doHandshake(tab)
});

chrome.webNavigation.onCompleted.addListener((tab) => {
  doHandshake(tab)
});

async function doHandshake(tab) {
  chrome.tabs.sendMessage(
    tabId = tab.tabId,
    message = 'hello',
    async (response) => {
      chrome.runtime.lastError ? await injectContentScript(tab) : console.log(response);
    }
  )
}

async function injectContentScript(tab) {
  console.log('injectscript')
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId },
    files: ["main.js",
      "canvas.js",
      "cursor.js",
      "gestures.js"]
  });
}


chrome.runtime.onMessage.addListener(
  async function (request, sender) {
    switch (request.action) {
      case "closeCurrentTab":
        await closeCurrentTab(sender.tab, request.moveLeft,);
        break;
      case "switchTab":
        await switchTab(sender.tab, request.moveLeft);
        break;
    }
  });


async function closeCurrentTab(activeTab, moveLeft = true) {
  const adjacentTab = await getAdjacentTab(activeTab, moveLeft)
  await chrome.tabs.remove(activeTab.id)
  await chrome.tabs.update(
    adjacentTab.id,
    updateProperties = { active: true }
  )
}


async function closeTab(moveLeft = true) {
  const [currentTab] = await chrome.tabs.query({ currentWindow: true, active: true })
  const adjacentTab = await getAdjacentTab(activeTab, moveLeft)
  await chrome.tabs.remove(currentTab.id)
  await chrome.tabs.update(
    adjacentTab.id,
    updateProperties = { active: true }
  )
}

async function switchTab(activeTab, moveLeft = true) {
  const nextTab = await getAdjacentTab(activeTab, moveLeft)
  await chrome.tabs.update(
    nextTab.id,
    updateProperties = { active: true }
  )
}


async function getAdjacentTab(activeTab, left = true) {
  const tabs = await chrome.tabs.query({ currentWindow: true })
  const nextTab = left ? tabs.at(activeTab.index - 1) : tabs.at((activeTab.index + 1) % tabs.length)


  // const [adjacentTab] = await chrome.tabs.query({ index: nextIndex() })
  return nextTab
}