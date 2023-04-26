function addCustomDiv() {
  // Get the body element of the page
  const body = document.querySelector('body');

  // Create a new div element
  const div = document.createElement('div');

  // Find the div on the page that contains the content you're looking for
  const contentDiv = document.querySelector('#content');

  // Use a regular expression to find the text you're interested in
  const regex = /Some regex pattern/g; // Replace with your own regular expression
  const matches = regex.exec(contentDiv.innerHTML);
  const matchedText = matches ? matches[0] : '';

  // Set the innerHTML of the new div to the matched text
  div.innerHTML = `<h1>Matched Text:</h1><p>${matchedText}</p>`;

  // Append the div to the body element
  body.appendChild(div);
}

// Call the addCustomDiv function when the page has finished loading
window.addEventListener('load', addCustomDiv);

