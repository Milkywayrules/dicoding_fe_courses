import initHandleOptionBtn from "./handle-option-btn.js";

/**
 * 
 * Render HTML element to document with insertAdjacentHTML.
 * 
 * @param {String} targetParentId Target parent element ID.
 * @param {String} where Location where the insertAdjacentHTML support.
 * @param {String} renderedEl HTML template with props filled.
 * @param {Element} elementItSelf element
 * 
 */
const render = (targetParentId, where, renderedEl, elementItSelf = null, dbData = null) => {
  document.getElementById(`${targetParentId}`).insertAdjacentHTML(`${where}`, renderedEl);

  // if we provide the element itself (not the HTML template only)
  // we assume you are  going to use option button.
  if (elementItSelf && dbData) {
    initHandleOptionBtn(elementItSelf, dbData)
  }
}

export default render;