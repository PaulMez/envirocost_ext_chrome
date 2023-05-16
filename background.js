// Background script.js
// This script runs in the background of the Chrome extension

// Function to send an HTTP request
function sendHttpRequest(data) {
    fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseData => {
        // Send the response back to the content script
        console.log(responseData)
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, responseData);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { error: error.message });
        });
      });
  }
  
  // Listen for messages from the content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Call the function to send the HTTP request
    sendHttpRequest(message);
  });
  