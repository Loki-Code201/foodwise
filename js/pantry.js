/////////////// Utility functions ////////////////////

function PantryItem(name, quantity, expiration, category) {
  this.name = name;
  this.quantity = quantity;
  this.expiration = expiration;
  this.category = category;
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

////////////// local storage functions //////////////////

function getLocalStorage(name) {
  const storageData = localStorage.getItem(name);
  if (storageData) {
    const parsedArray = JSON.parse(storageData);

    return parsedArray;
  }
}

function setLocalStorage(array, name) {
  const stringifiedArray = JSON.stringify(array);
  localStorage.setItem(name, stringifiedArray);
}

////////////////// rendering functions
// table stuff
function renderTableRow(values) {
  const tbodyElem = document.getElementById("tbody");

  let trElem = makeElement("tr", tbodyElem);
  makeElement("th", trElem, "placeholder");
  for (let i = 0; i < values.length; i++) {
    makeElement("td", trElem, `${values[i]}`);
  }
}

function renderTable(values) {
  const tableElem = document.getElementById("table");
  if (tableElem) {
    renderTableRow(values);
  }
}

//////////////// Listeners ////////////////////////

function formCb(event) {
  event.preventDefault();
  // need to append to table elem
  const formData = new FormData(event.target);
  const values = [];

  // iterates through the key and value of the form inputs
  for (const pair of formData.entries()) {
    values.push(pair[1]);
  }

  const pantryItem = new PantryItem(...values);
  // add to local storage instead and then render from local storage
  renderTable(values);

  setLocalStorage(pantryItem, "pantry");
  const storageData = getLocalStorage("pantry");

  const rehydratedValues = Object.values(storageData);
  const rehydratedObj = new PantryItem(...rehydratedValues);
  console.log(rehydratedObj);
}

const form = document.getElementById("addFood");
form.addEventListener("submit", formCb);
