/**
 * 
 * Render HTML element to document with insertAdjacentHTML.
 * 
 * @param {String} targetParentId Target parent element ID.
 * @param {String} where Location where the insertAdjacentHTML support.
 * @param {String} renderedEl HTML template with props filled.
 * 
 */
const render = (targetParentId, where, renderedEl) => {
  document.getElementById(`${targetParentId}`).insertAdjacentHTML(`${where}`, renderedEl);
}

export default render;