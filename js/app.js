// "use strict";
// /////////////// Utility functions ////////////////////

// function FoodItem(name, quantity, expiration, category) {
//   this.name = name;
//   this.quantity = quantity;
//   this.expiration = expiration;
//   this.category = category;
//   this.shoppingList = false;
// }

// ////////////// local storage functions //////////////////

// function getLocalStorage(name) {
//   const storageData = localStorage.getItem(name);
//   if (storageData) {
//     const parsedArray = JSON.parse(storageData);
//     return parsedArray;
//   }
// }

// function setLocalStorage(name, array) {
//   const stringifiedArray = JSON.stringify(array);
//   localStorage.setItem(name, stringifiedArray);
// }

// function deleteItemFromStorage(array) {
//   // deletes an obj from Local Storage based off the name property
//   const currentLocalStorage = getLocalStorage("pantry");

//   const filtered = currentLocalStorage.filter(function (el) {
//     return el.name != array[0];
//   });
//   return filtered; // returns the new filtered array
// }

// function checkForDuplicateStorageItem(currentLocalStorage, array) {
//   if (currentLocalStorage) {
//     // check for duplicate item names
//     let quantityBefore;
//     const checkDuplicate = currentLocalStorage.some((elem) => {
//       quantityBefore = elem.quantity;
//       return elem.name.toLowerCase() === array[0].toLowerCase();
//     });

//     if (checkDuplicate) {
//       return quantityBefore;
//     }
//     return false;
//   }
// }

// function updateDuplicateStorageItem(quantityBefore, array) {
//   // remove from local storage to update the quantity then add back
//   // since the input was a duplicate, delete from local storage
//   const updatedQuantity = deleteItemFromStorage(array);

//   // get the sum of the previous quantity and the new quantity entered
//   array[1] = parseInt(array[1]) + parseInt(quantityBefore);

//   // add the new item to local storage with the updated quantity
//   updatedQuantity.push(new FoodItem(...array)); // push a new PantryItem with the quanitities added together
//   setLocalStorage("pantry", updatedQuantity);
//   renderFromStorage(getLocalStorage("pantry"));

//   return; // ???
// }

// function renderFromStorage(storageData) {
//   // creates a new array based on `storageData`s objects' values'
//   const rehydratedValues = Array.from(storageData, (x) => Object.values(x));
//   renderTableRow(rehydratedValues); // TODO: change to the values from rehydratedObj
// }

// //////////////// Listeners ////////////////////////
// function formCb(event) {
//   event.preventDefault();
//   // need to append to table elem
//   const formData = new FormData(event.target);
//   const values = [];

//   // iterates through the key and value of the form inputs
//   for (const pair of formData.entries()) {
//     values.push(pair[1].trim().toLowerCase()); // trims any extra spaces before or after the input
//   }

//   // test regex against product name
//   if (!testValidInput(values[0])) {
//     alert("bad input"); // TODO: change to show underneath the Input element
//     return;
//   }

//   const currentLocalStorage = getLocalStorage("pantry");
//   if (currentLocalStorage) {
//     const duplicate = checkForDuplicateStorageItem(currentLocalStorage, values);
//     if (duplicate) {
//       updateDuplicateStorageItem(duplicate, values);
//     } else {
//       currentLocalStorage.push(new FoodItem(...values));
//       setLocalStorage("pantry", currentLocalStorage);
//     }
//   } else {
//     // no local storage yet so set it up
//     this.push(new FoodItem(...values)); // `this` refers to the bound `pantryObjArray` array

//     setLocalStorage("pantry", this);
//   }
//   renderFromStorage(getLocalStorage("pantry"));
// }

// ///////////////// Main ///////////////////
// function main() {
//   const form = document.getElementById("addFood");
//   // instantly render data from local storage
//   const storageData = getLocalStorage("pantry");
//   if (storageData) {
//     renderFromStorage(storageData);
//   }

//   const pantryObjArray = []; // ends up in local storage
//   form.addEventListener("submit", formCb.bind(pantryObjArray));

//   // DEVELOPMENT purposes only
//   const resetButton = document.getElementById("resetHistory");
//   resetButton.onclick = function () {
//     window.localStorage.clear();
//     window.location.reload();
//   };
// }
// main();
