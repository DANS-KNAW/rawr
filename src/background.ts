chrome.action.onClicked.addListener(async (tab) => {
  // Check if the current tab ID is undefined
  if (tab.id === undefined) {
    return;
  }

  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";

  if (nextState === "ON") {
    // Inject the content script to the current tab
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/content.js"],
    });
  }

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
});