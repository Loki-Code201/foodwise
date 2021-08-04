'use strict';
console.log('Are you still there?');

const itemList = document.getElementById('addItem');

/////////////// Utility functions ////////////////////

function ListItem(name, quantity, category) {
    this.name = name;
    this.quantity = quantity;
    this.category = category;
  }

//////////// prototype method ///////////////////////////
ListItem.prototype.renderItem = function() {
  const itemString = `${this.quantity} ${this.name} | Category: ${this.category}`
  makeElement('li', document.getElementById('shopping-list'), itemString)
}

///////////// helper function /////////////////////
function _makeTheItem(name, quantity, category) {
  let newItem = new ListItem(name, quantity, category);

  newItem.renderItem();
}

  /////////////////////////// from my BusMall site ///////////////////////////////  
  //   function storeProduct() {
  //     // prepare the data to be stored
  //     // console.log(Product.allProducts);
  //     const stringifiedArray = JSON.stringify(Product.allProducts);
  //     console.log(Product.allProducts);
  //     // store the data in storage with the key
  //     localStorage.setItem('product', stringifiedArray);
  // }
  
  
// attributes is an object  = {src: "", alt: ""}
function makeElement(tagName, parent, textContent, attributes) {
    let element = document.createElement(tagName);
    if (attributes) {
      for (const property in attributes) {
        element.setAttribute(property, attributes[property]);
      }
    }
    if (textContent) {
      element.textContent = textContent;
    }
    parent.appendChild(element);
    return element; // returns the created element
}
  
  //use JSON.stringify() to turn objects into strings so they can be put into storage
  //use JSON.parse() to turn strings back into objects so you can pull them back out of storage

  //////////////////////// local storage functions (Kason's code) ////////////////////////
function setLocalStorage(name, array) {
  console.log();
  const stringifiedArray = JSON.stringify(array);
  console.log();
  localStorage.setItem(name, stringifiedArray)
}
  
function getLocalStorage(name) {
  const storageData = localStorage.getItem(name);
  if (storageData) {
    const parsedArray = JSON.parse(storageData);
    return parsedArray;
  }
}

// function renderFromStorage() {
//   console.log(storageData);
//   const rehydratedValues = Object.values(storageData);
//   const rehydratedObj = new Item(...rehydratedValues);
//   console.log(rehydratedValues);
//   console.log(rehydratedObj);
// }
  
//////////////// Listeners ////////////////////////
function listCb(event) {
  event.preventDefault();
  // need to append to table elem
  const formData = new FormData(event.target);
  const values = [];

  // iterates through the key and value of the list inputs
  for (const pair of formData.entries()) {
    values.push(pair[1]);
  }

  const item = new ListItem(...values);
  // add to local storage instead and then render from local storage
  const currentItemsArray = [item];
  setLocalStorage("list", currentItemsArray);
}

const list = document.getElementById("addItem");
list.addEventListener("submit", listCb);
  