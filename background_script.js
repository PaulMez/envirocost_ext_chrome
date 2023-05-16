// Background script.js
// This script runs in the background of the Chrome extension

// Function to send a message to the content script
function sendMessageToContentScript(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'fetchData' });
  }
  
  // Listen for tab refresh events
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      // Send a message to the content script when the tab refresh is complete
      sendMessageToContentScript(tabId);
    }
  });
  
  // Listen for tab click events
  chrome.tabs.onActivated.addListener(activeInfo => {
    // Send a message to the content script when a tab is clicked
    sendMessageToContentScript(activeInfo.tabId);
  });
  