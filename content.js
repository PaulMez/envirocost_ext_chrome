// fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {


// Function to log the received message
function logMessage(message) {
  console.log('Received message:', message);

  // Extract the response array from the message
  const responseArray = message.res || [];
  
  // Update the corresponding elements with the response data
  responseArray.forEach((value, index) => {
    const element = document.querySelector(`.element-${index}`);
    if (element) {
      element.textContent = value;
    }
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(logMessage);

console.log("EnviroCost Ext Loaded");

// Function to fetch data and send it to the background script
function fetchDataAndSendToBackground() {
  // Read the specific <a> elements on the website
  const linkElements = document.querySelectorAll('a.cart-item-name');
  
  // Extract the text content of each element
  const textContentArray = Array.from(linkElements).map(element => element.textContent.trim());

  // Create data object to send to the background script
  const data = {
    req: textContentArray.concat('Item 2')
  };

  console.log(textContentArray);
  console.log(data);

  // Send a message to the background script
  chrome.runtime.sendMessage(data);
}

// Fetch data initially
fetchDataAndSendToBackground();

// Fetch data when a click event occurs
document.addEventListener('click', fetchDataAndSendToBackground);
