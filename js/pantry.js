/////////////// Utility functions ////////////////////

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

// table stuff
function renderTableRow(values) {
  const tbodyElem = document.getElementById("tbody");

  makeElement("tr", tbodyElem);
  makeElement("th", tbodyElem, 'placeholder');
  for (let i = 0; i < values.length; i++) {
    makeElement("td", tbodyElem, `${values[i]}`);
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
  for (let pair of formData.entries()) {
    values.push(pair[1]);
  }
  renderTable(values);
}

const form = document.getElementById("addFood");
form.addEventListener("submit", formCb);
