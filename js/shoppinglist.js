"use strict";
/////////////// Utility functions ////////////////////

function ListItem(name, quantity, expiration, category) {
  this.name = name;
  this.quantity = quantity;
  this.expiration = expiration;
  this.category = category;
  this.inPantry = false;
  this.shoppingList = false;
}

// attributes is an object  = {src: "", alt: ""}
function makeElement(tagName, parent, textContent, attributes) {
  const element = document.createElement(tagName);
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

///////////////////////// utitlity functions
function testValidInput(string) {
  // regular expression to test input name for just letters
  const regex = /^[a-zA-Z\s]+$/;
  const testReg = regex.exec(string);
  return testReg;
}

////////////// local storage functions //////////////////

function getLocalStorage(name) {
  const storageData = localStorage.getItem(name);
  if (storageData) {
    const parsedArray = JSON.parse(storageData);
    return parsedArray;
  }
}

function setLocalStorage(name, array) {
  const stringifiedArray = JSON.stringify(array);
  localStorage.setItem(name, stringifiedArray);
}

function deleteItemFromStorage(array) {
  // deletes an obj from Local Storage based off the name property
  const currentLocalStorage = getLocalStorage("pantry");

  const filtered = currentLocalStorage.filter(function (el) {
    return el.name != array[0];
  });
  return filtered; // returns the new filtered array
}

function checkForDuplicateStorageItem(currentLocalStorage, array) {
  if (currentLocalStorage) {
    // check for duplicate item names
    let quantityBefore;
    const checkDuplicate = currentLocalStorage.some((elem) => {
      quantityBefore = elem.quantity;
      return elem.name.toLowerCase() === array[0].toLowerCase();
    });

    if (checkDuplicate) {
      return quantityBefore;
    }
    return false;
  }
}

function updateDuplicateStorageItem(quantityBefore, array) {
  // remove from local storage to update the quantity then add back
  // since the input was a duplicate, delete from local storage
  const updatedQuantity = deleteItemFromStorage(array);

  // get the sum of the previous quantity and the new quantity entered
  array[1] = parseInt(array[1]) + parseInt(quantityBefore);

  // add the new item to local storage with the updated quantity
  updatedQuantity.push(new ListItem(...array)); // push a new PantryItem with the quanitities added together
  setLocalStorage("pantry", updatedQuantity);
  renderFromStorage(getLocalStorage("pantry"));

  return; // ???
}

////////////////// rendering functions
// table stuff
// values parameter is an array
function renderTableRow(values) {
  console.log(getLocalStorage("pantry"));
  console.log(values);
  const tbodyElem = document.getElementById("tbody2");
  tbodyElem.innerHTML = "";

  const trElem = makeElement("tr", tbodyElem);
  const thElem = makeElement("th", trElem);
  thElem.appendChild(renderTableButton("Delete", "button", deleteItem));

  // only render the first 3 values
  for (let i = 0; i < 3; i++) {
    makeElement("td", trElem, values[i]);
  }

  //   for (const value of values) {
  //     makeElement("td", trElem, value);
  //   }

  //   for (const array of values) {
  //     // only render if the property shopping list is True
  //     console.log(array);
  //     if (array[4] === true) {
  //       // remove expiration date from array
  //       array.splice(2, 1);
  //       // remove last 2 properties of the obj so it doesn't render. There is definitely a better way to do this
  //       array.pop();
  //       array.pop();
  //       const trElem = makeElement("tr", tbodyElem);
  //       const thElem = makeElement("th", trElem);
  //       thElem.appendChild(renderTableButton("Delete", "button", deleteItem));

  //       for (const value of array) {
  //         makeElement("td", trElem, value);
  //       }
  //     }
  //   }
}

function renderTableButton(value, className, fn) {
  let btn = document.createElement("input");
  btn.type = "button";
  btn.className = className;
  btn.value = value;
  btn.onclick = fn;
  return btn;
}

function renderFromStorage(storageData) {
  // creates a new array based on `storageData`s objects' values'
  console.log(storageData);
  const tbodyElem = document.getElementById("tbody2");
  tbodyElem.innerHTML = "";
  for (const obj of storageData) {
    console.log(obj);
    if (obj.shoppingList === true) {
      const test = Object.values(obj);
      console.log(test);
      // const rehydratedValues = Array.from(storageData, (x) => Object.values(x));
      // console.log(rehydratedValues);
      renderTableRow(test);
    }
  }
}

function deleteItemFromTable(event) {
  const th = event.target.parentNode;
  const tr = th.parentNode;
  tr.parentNode.removeChild(tr);
}

function deleteItem(event) {
  deleteItemFromTable(event);

  const currentItemToDelete = event.target.parentNode.parentNode;
  const currentItemTDs = currentItemToDelete.children;

  // convert the HTMLCollection to an array
  const newArray = [...currentItemTDs];
  // remove the first item out of the array (this is the button in the table which we don't need right here)
  newArray.shift();

  // creates a new array based on `newArray`s innerHTML values on exch td
  const itemValues = Array.from(newArray, (x) => x.innerHTML);
  setLocalStorage("pantry", deleteItemFromStorage(itemValues));
}

//////////////// Listeners ////////////////////////
function formCb(event) {
  event.preventDefault();
  // need to append to table elem
  const formData = new FormData(event.target);
  const values = [];

  // iterates through the key and value of the form inputs
  for (const pair of formData.entries()) {
    values.push(pair[1].trim().toLowerCase()); // trims any extra spaces before or after the input
  }

  // test regex against product name
  if (!testValidInput(values[0])) {
    alert("bad input"); // TODO: change to show underneath the Input element
    return;
  }

  const currentLocalStorage = getLocalStorage("pantry");
  if (currentLocalStorage) {
    const duplicate = checkForDuplicateStorageItem(currentLocalStorage, values);
    if (duplicate) {
      updateDuplicateStorageItem(duplicate, values);
    } else {
      currentLocalStorage.push(new ListItem(...values));
      setLocalStorage("pantry", currentLocalStorage);
    }
  }
  // no local storage yet so set it up
  const newObj = new ListItem(...values);
  newObj.shoppingList = true;
  this.push(newObj); // `this` refers to the bound `pantryObjArray` array

  setLocalStorage("pantry", this);
  renderFromStorage(getLocalStorage("pantry"));
}

///////////////// Main ///////////////////
function main() {
  const form = document.getElementById("addItem");
  // instantly render data from local storage
  const storageData = getLocalStorage("pantry");
  if (storageData) {
    renderFromStorage(storageData);
  }

  const shoppingListArray = []; // ends up in local storage
  form.addEventListener("submit", formCb.bind(shoppingListArray));

  // DEVELOPMENT purposes only
  const resetButton = document.getElementById("resetHistory");
  resetButton.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
  };
}
main();
