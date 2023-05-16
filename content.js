// fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {


// Function to log the received message
function logMessage(message) {
  console.log('Received message:', message);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(logMessage);


console.log("EnviroCost Ext Loaded")


// Read the specific ID or div on the website
const element = document.getElementsByClassName('cart-item-name');
const data = {
  req: ["element.innerText", "Item 2"]
};
console.log(element.innerText)
console.log(data)

// Send a message to the background script
chrome.runtime.sendMessage(data);