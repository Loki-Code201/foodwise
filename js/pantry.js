/////////////// Utility functions ////////////////////

function PantryItem(name, quantity, expiration, category) {
  this.name = name;
  this.quantity = quantity;
  this.expiration = expiration;
  this.category = category;
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

////////////////// rendering functions
//
function renderTableButton(value, className, fn) {
  let btn = document.createElement("input");
  btn.type = "button";

  btn.className = className;
  btn.value = value;
  btn.onclick = fn;
  return btn;
}

function deleteItemFromTable(event) {
  const th = event.target.parentNode;
  const tr = th.parentNode;
  tr.parentNode.removeChild(tr);
  // re render the table?
  // this function rerenders it automatically it seems, so don't need to RE render
}

function deleteItemFromStorage(array) {
  // deletes an obj from Local Storage based off the name property
  const currentLocalStorage = getLocalStorage("pantry");

  const filtered = currentLocalStorage.filter(function (el) {
    return el.name != array[0];
  });

  return filtered; // returns the new filtered array
}

function deleteItem(event) {
  deleteItemFromTable(event);

  const currentItemToDelete = event.target.parentNode.parentNode;
  const currentItemTDs = currentItemToDelete.children;

  // convert the HTMLCollection to an array
  const newArray = [...currentItemTDs];
  // remove the first item out of the array (this is the button in the table which we don't need right here)
  newArray.shift();

  const itemValues = [];
  for (let td of newArray) {
    itemValues.push(td.innerHTML);
  }
  setLocalStorage("pantry", deleteItemFromStorage(itemValues));

  // delete obj
  // delete item from local storage
  // separate functions?
}

// table stuff
// values parameter is an array
function renderTableRow(values) {
  const tbodyElem = document.getElementById("tbody");
  tbodyElem.innerHTML = "";
  for (const array of values) {
    const trElem = makeElement("tr", tbodyElem);
    const thElem = makeElement("th", trElem);
    thElem.appendChild(renderTableButton("Delete", "button", deleteItem));

    for (const value of array) {
      makeElement("td", trElem, value);
    }
  }
}

function renderFromStorage(storageData) {
  const rehydratedValues = [];
  for (const obj of storageData) {
    rehydratedValues.push(Object.values(obj));
  }
  renderTableRow(rehydratedValues); // TODO: change to the values from rehydratedObj
}

//////////////// Listeners ////////////////////////
function formCb(event) {
  event.preventDefault();
  // need to append to table elem
  const formData = new FormData(event.target);
  const values = [];
  const currentLocalStorage = getLocalStorage("pantry");

  // iterates through the key and value of the form inputs
  for (const pair of formData.entries()) {
    values.push(pair[1].trim().toLowerCase()); // trims any extra spaces before or after the input
  }

  // use a regular expression to test input name for just letters
  const regEx = /^[a-zA-Z]+$/;
  let testReg = regEx.exec(values[0]);
  if (testReg === null) {
    alert("bad input");
    return;
  }

  // gets what is in the current local storage array of objects (if any), and add an object into that array and then put that array back into local storage
  if (currentLocalStorage) {

    let fruitArr = [];

    for (let item of currentLocalStorage) {
      fruitArr.push(item.name.toLowerCase());

    }
    let fruitInput = event.target.food.value.toLowerCase()
    if (fruitArr.includes(fruitInput)) {

      for (let item of currentLocalStorage) {
        console.log(item);
        //if name is found alert user yes or no to update quantity instead. if yes update extisting obj quantity with value from quantity input in form.
        if (item.name.toLowerCase() === event.target.food.value.toLowerCase()) {
          alert('This item already exist, Would you like to update quantity instead?');
          updateQuantityAnswer = prompt('yes or no?');
          if (updateQuantityAnswer.toLowerCase() === 'yes') {
            let intNumber = (parseInt(item.quantity) + parseInt(event.target.quantity.value));
            item.quantity = intNumber.toString();
            console.log(`item.quantity is ${item.quantity}`);
            break;
          }
        }
      }
    } else {
      //if name isnt found push item in array.
      currentLocalStorage.push(new PantryItem(...values))
    }
    setLocalStorage("pantry", currentLocalStorage);
  } else {
    // no local storage yet so set it up
    this.push(new PantryItem(...values)); // `this` refers to the bound `pantryObjArray` array
    setLocalStorage("pantry", this);
  }
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

  // DEVELOPMENT purposes only
  const resetButton = document.getElementById("resetHistory");
  resetButton.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
  };
}
main();
