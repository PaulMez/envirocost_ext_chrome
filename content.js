// fetch('http://envirocost.australiaeast.cloudapp.azure.com/structured', {



// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchData') {
    // Call the function to fetch data and send it to the API
    fetchDataAndSendToAPI();
  }
});

console.log("EnviroCost Ext Loaded")


// Read the specific ID or div on the website
const element = document.getElementsByClassName('cart-item-name');
const data = {
  req: [element.innerText, "Item 2"]
};
console.log(element.innerText)
console.log(data)

// Send a message to the background script
sendMessageToBackgroundScript(data);