/**
 *
 * Initialize toggle on/off Rak feature
 * for all viewports/breakpoints a.k.a responsive.
 *
 */
const initToggleRak = () => {
  // initialize const element
  // button toggle menu left (default & large breakpoint)
  const leftContentBtnEl = document.getElementById("left-content-btn");
  const leftContentBtnLgEl = document.getElementById("left-content-btn-lg");
  const leftContentEl = document.getElementById("left-content");

  // button toggle menu right (default & large breakpoint)
  const rightContentBtnEl = document.getElementById("right-content-btn");
  const rightContentBtnLgEl = document.getElementById("right-content-btn-lg");
  const rightContentEl = document.getElementById("right-content");

  // get all Rak btn el and get all Rak content el
  const allToggleBtn = document.querySelectorAll("[data-toggle-for]");
  const allToggleContent = document.querySelectorAll("[data-toggle-from]");

  /**
   *
   * Set specific Rak by button el and content el to be active.
   *
   * @param {obj} btnEl Button to be set active
   * @param {obj} contentEl Element to be set active
   */
  const setRakActive = (btnEl, contentEl) => {
    btnEl.classList.add("toggle__btn__active");
    contentEl.classList.replace("hidden", "show");
  };

  /**
   *
   * Set specific Rak by button el and content el to be not active.
   *
   * @param {obj} btnEl Button to be set not active
   * @param {obj} contentEl Element to be set not active
   */
  const setRakDeactive = (btnEl, contentEl) => {
    btnEl.classList.remove("toggle__btn__active");
    contentEl.classList.replace("show", "hidden");
  };

  /**
   *
   * Add event listener to all Rak toggle btn.
   *
   */
  allToggleBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idBtn = btn.id;

      // activate clicked button and deactivate others
      // we do it now manually for the sake of dev speed
      if (btn.className.includes("toggle__btn__active")) {
        if (idBtn === "left-content-btn") {
          setRakDeactive(leftContentBtnEl, leftContentEl);
        } else if (idBtn === "right-content-btn") {
          setRakDeactive(rightContentBtnEl, rightContentEl);
        }
      } else {
        if (idBtn === "left-content-btn") {
          setRakActive(leftContentBtnEl, leftContentEl);
          setRakDeactive(rightContentBtnEl, rightContentEl);
        } else if (idBtn === "right-content-btn") {
          setRakActive(rightContentBtnEl, rightContentEl);
          setRakDeactive(leftContentBtnEl, leftContentEl);
        }
      }
    });
  });
};

export default initToggleRak;
