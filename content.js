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
           // Get the sibling element following the <a> element
           let siblingElement = element.nextElementSibling;

           // If the sibling is a <p> element and its text is a number, replace its text
           if (siblingElement) {
            if (siblingElement.tagName.toLowerCase() === 'p') {
                // Clear the inner contents of the siblingElement
                siblingElement.innerHTML = '';
        
                // Add the text and image to the <p> element
                siblingElement.appendChild(img);
                siblingElement.appendChild(document.createTextNode('('));
                //siblingElement.appendChild(document.createTextNode(' ' + value[1] + 'g of CO<sub>2</sub>)'));
                siblingElement.insertAdjacentHTML('beforeend', ' ' + value[1] + 'g of CO<sub>2</sub>)');
            } 
        }
        // Otherwise, create a new <p> element and add it after the <a> element
        else {
            let newP = document.createElement('p');
            newP.style.color = 'DarkGray';
            newP.style.fontWeight = 'italic';
        
            // Create an image element
            let img = document.createElement('img');
            img.src = chrome.runtime.getURL('Icon-32.png');
            img.style.verticalAlign = 'middle';
        
            // Add the text and image to the <p> element
            newP.appendChild(img);
            newP.appendChild(document.createTextNode('('));
            
            //newP.appendChild(document.createTextNode(' ' + value[1] + 'g of CO<sub>2</sub>)'));
            newP.insertAdjacentHTML('beforeend', ' ' + value[1] + 'g of CO<sub>2</sub>)');
            element.parentNode.insertBefore(newP, element.nextSibling);
        }
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
