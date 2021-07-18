


/**
 * 
 * something
 * 
 * @param {Element} element some
 */
const toggleShowOrHide = (element, oldToken = null, newToken = null) => {
  if (oldToken && newToken) {
    element.classList.replace(oldToken, newToken);
  } else {
    element.classList.toggle("hidden");
    element.classList.toggle("show");
  }
}

export default toggleShowOrHide;