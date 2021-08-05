// global variables
const pantryObjArray = []; // being put in local storage



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
  console.log(storageData);
}


function setLocalStorage(name, array) {
  const stringifiedArray = JSON.stringify(array);
  localStorage.setItem(name, stringifiedArray);
}

////////////////// rendering functions
// table stuff
// values parameter is an array
function renderTableRow(values) {
  const tbodyElem = document.getElementById("tbody");
  tbodyElem.innerHTML = "";

  for (const array of values) {
    const trElem = makeElement("tr", tbodyElem);
    makeElement("th", trElem, "placeholder");

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

// const rehydratedValues = duplicateCheck;
// console.log(duplicateCheck)
// function noDuplicates() {
//   duplicateCheck = rehydratedValues;
//   .map((duplicateCheck) => {
//     return {
//       count: 1,
//       input: input
//     }
//   })
//     .reduce((a, b) => {
//       a[b.name] = (a[b.name] || 0) + b.count
//       return a
//     }, {})

//   var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)

//   console.log(duplicates) // [ 'Nancy' ]
// }


//////////////// Listeners ////////////////////////
function formCb(event) {
  event.preventDefault();

  // need to append to table elem
  const formData = new FormData(event.target);
  const values = [];
  const currentLocalStorage = getLocalStorage("pantry");
  // console.log(pantryObjArray); //pantryObjArray is empty?
  console.log(currentLocalStorage);

  // iterates through the key and value of the form inputs
  for (const pair of formData.entries()) {
    values.push(pair[1]);
  }

  // gets what is in the current local storage array of objects (if any), and add an object into that array and then put that array back into local storage
  if (currentLocalStorage) {

    let fruitArr = [];

    for (let item of currentLocalStorage) {
      fruitArr.push(item.name.toLowerCase());

    }
    
    //checks for duplicates from user input and prompts to add quantity instead
    
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
      currentLocalStorage.push(new PantryItem(...values));

    }


    setLocalStorage("pantry", currentLocalStorage);

  }

  else {
    // no local storage yet so set it up
    this.push(new PantryItem(...values)); // `this` refers to the bound `pantryObjArray` array


    setLocalStorage("pantry", this);
  }

  renderFromStorage(getLocalStorage("pantry")); //currently not clearing clearing the current table
}

///////////////// Main ///////////////////

function main() {
  const form = document.getElementById("addFood");
  const storageData = getLocalStorage("pantry");
  if (storageData) {
    renderFromStorage(storageData);
  }




  form.addEventListener("submit", formCb.bind(pantryObjArray));

  // DEVELOPMENT purposes only
  const resetButton = document.getElementById("resetHistory");
  resetButton.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
  };
}
main();
