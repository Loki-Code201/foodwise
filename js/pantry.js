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
  console.log(array);
  console.log(name);
  const stringifiedArray = JSON.stringify(array);
  localStorage.setItem(name, stringifiedArray);
}

////////////////// rendering functions
// table stuff
// values parameter is an array
function renderTableRow(values, table) {
  let tbodyElem = document.getElementsByTagName("tbody")[0];

  const newTbody = makeElement("tbody", table);

  // tbodyElem.innerHTML = "";

  // tableElem.replaceChild(newTbody, tbodyElem);
  makeElement("tr", newTbody);
  makeElement("th", newTbody, "placeholder");
  for (let i = 0; i < values.length; i++) {
    makeElement("td", newTbody, `${values[i]}`);
  }
}

// values parameter is an array
function renderTable(values) {
  const tableElem = document.getElementById("table");
  if (tableElem) {
    renderTableRow(values, tableElem);
  }
}

function renderFromStorage(storageData) {
  for (let obj of storageData) {
    console.log(obj);
    const rehydratedValues = Object.values(obj);
    console.log(rehydratedValues);
    // const rehydratedObj = new PantryItem(...rehydratedValues);
    renderTable(rehydratedValues); // TODO: change to the values from rehydratedObj
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
  console.log(this);
  this.push(new PantryItem(...values)); // `this` refers to the bound `pantryObjArray` array
  console.log(this);
  setLocalStorage(this, "pantry");
  renderFromStorage(getLocalStorage("pantry"));
}

///////////////// Main ///////////////////
function main() {
  const form = document.getElementById("addFood");
  const storageData = getLocalStorage("pantry");
  if (storageData) {
    renderFromStorage(storageData);
  }

  const pantryObjArray = []; // being put in local storage
  form.addEventListener("submit", formCb.bind(pantryObjArray));

  // add to local storage instead and then render from local storage
  // renderTable(values);

  // DEVELOPMENT purposes only
  const resetButton = document.getElementById("resetHistory");
  resetButton.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
  };
}
main();
