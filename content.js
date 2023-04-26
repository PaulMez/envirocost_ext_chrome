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

// Call the addCustomDiv function after 5 seconds
setTimeout(addCustomDiv, 3000);

