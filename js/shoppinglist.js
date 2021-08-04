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
  const stringifiedArray = JSON.stringify(array);
  localStorage.setItem(name, stringifiedArray)
}
  
function getLocalStorage(name) {
  const storageData = localStorage.getItem(name);
  if (storageData) {
    const parsedArray = JSON.parse(storageData);
    return parsedArray;
  }
}
  
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

  // if there's data in local storage, add new item to local storage without removing existing data
  // else if no data, create new local storage
  if (getLocalStorage("list")) {
    let blah = getLocalStorage("list");
    blah.push(item);
    setLocalStorage("list", blah);
  } else {
    setLocalStorage("list", currentItemsArray);
  }
}

function renderFromStorage() {
  // get data from local storage and render it to the UL on shopping-list.html
  getLocalStorage("list");  
  const textContent = `${quantity} ${name} | Category: ${category}`;
  makeElement('li', document.getElementById('shopping-list'), textContent);
}

const list = document.getElementById("addItem");
list.addEventListener("submit", listCb);
renderFromStorage();
  