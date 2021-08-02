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

//////////////// Listeners ////////////////////////

function formCb(event) {
  event.preventDefault();
  const mainElem = document.getElementsByTagName("main")[0];
  const formData = new FormData(event.target);

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
    const pElem = makeElement("p", mainElem, `${pair[0]}: `);
    makeElement("span", pElem, pair[1]);
  }
}

const form = document.getElementById("addFood");
form.addEventListener("submit", formCb);
