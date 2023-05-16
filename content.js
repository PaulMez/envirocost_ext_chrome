function addCustomDiv() {
  // Get the body element of the page
  const body = document.querySelector('body');

  // Create a new div element
  const div = document.createElement('div');

  // Find the shopping cart element on the page
  const cart = document.querySelector('.cart'); // Replace with the class name of the shopping cart element

  // Extract the list of items from the cart element
  const items = [];
  const regex = /(?:<li>|<tr>).*?(?=<\/li>|<\/tr>)/gs;
  const matches = cart.innerHTML.matchAll(regex);
  for (const match of matches) {
    const itemText = match[0].replace(/<(?:.|\n)*?>/gm, '').trim();
    if (itemText !== '') {
      items.push(itemText);
    }
  }



  // Display the list of items in the new div element
  const listItems = items.map(item => `<li>${item}</li>`).join('');
  div.innerHTML = `<h1>Shopping Cart Items:</h1><ul>${listItems}</ul>`;
  console.log(listItems);
  // Append the div to the body element
  body.appendChild(div);
}

// Function to fetch data and send it to the API
function fetchDataAndSendToAPI() {
  // Read the specific ID or div on the website
  const element = document.getElementById('your-id');
  const data = {
    req: [element.innerText, "Item 2"]
  };

  // Send JSON data to API
  fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // Process the response data
      console.log(responseData);

      // You can perform further actions here using the response data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchData') {
    // Call the function to fetch data and send it to the API
    fetchDataAndSendToAPI();
  }
});

// Call the function when the content script is loaded or whenever necessary
fetchDataAndSendToAPI();

