import initHandleOptionBtn from "./handle-option-btn.js";

/**
 *
 * Render HTML element to document with insertAdjacentHTML.
 *
 * @param {String} targetParentId Target parent element ID.
 * @param {String} where Location where the insertAdjacentHTML support.
 * @param {String} renderedElHTMLTemplate HTML template with props filled.
 * @param {Element} elementItSelf Element obj.
 * @param {Array} dbData All data for/from DB.
 *
 */
const render = (
  targetParentId,
  where,
  renderedElHTMLTemplate,
  elementItSelf = null,
  dbData = null,
) => {
  document
    .getElementById(`${targetParentId}`)
    .insertAdjacentHTML(`${where}`, renderedElHTMLTemplate);

  // if we provide the element itself (not the HTML template only)
  // we assume you are going to use option button.
  // And in the most (every) cases, we do use opt btn for rakbuku xixi.
  if (elementItSelf && dbData) {
    initHandleOptionBtn(elementItSelf, dbData);
  }
};

export default render;


/**
 * 
 * get true-rakStillEmpty
 * get false-rakStillEmpty
 * 
 * @param {Object} { cardWrapper, prefixEmptyMessageID } left-cards or right-cards | "true" or "false"
 * 
 */
export const renderDataEmptyMessage = ({ cardWrapper, prefixEmptyMessageID }) => {
  const t = `<p id="${prefixEmptyMessageID}-rakStillEmpty" style='color: #cbd5e1; margin: 16px auto 0; text-align: center;'> Masih kosong nih, yuk isi...<br />😎😎😎 </p>`;
  cardWrapper.parentElement.innerHTML = t
}