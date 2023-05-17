// fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {


// Function to log the received message
function logMessage(message) {
  console.log('Received message:', message);

  // Extract the response array from the message
  const responseArray = message.res || [];
  
  // Update the corresponding elements with the response data
  responseArray.forEach((value, index) => {
    // Select all elements with the class 'cart-item-name'
    let elements = document.querySelectorAll('.cart-item-name');

    // Iterate over the selected elements
    elements.forEach((element) => {
        // Check if the element's text matches value[0]
        if (element.innerText === value[0]) {
            // Replace the element's text with the concatenation of value[0] and value[1]
           // Create a new <p> element
           let newP = document.createElement('p');
           // Set the <p> element's text to value[1]
           newP.innerText = value[1];
           // Insert the new <p> element after the <a> element
           element.parentNode.insertBefore(newP, element.nextSibling);
        }
    });
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
