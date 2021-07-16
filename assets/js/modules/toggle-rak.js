/**
 *
 * Initialize toggle on/off Rak feature
 * for all viewports/breakpoints a.k.a responsive.
 *
 */
const initToggleRak = () => {
  // initialize const element
  const toggleArrows = document.querySelectorAll(".toggle-arrow");
  const arrowsState = [];

  // Store toggle function unique to every btn
  toggleArrows.forEach((arrow, idx) => {
    const toggleArrowState = (activeState) => {
      if (activeState) arrow.style.transform = `rotate(180deg)`; // aktif jadi ke atas
      else arrow.style.transform = `rotate(0deg)`; // deactive jadi ke bawah (default)
      return true;
    };

    arrowsState.push({
      _id: idx,
      btnId: arrow.parentElement.id,
      svgId: arrow.id,
      toggleArrowState,
    });
  });

  // do the rest

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
  const arrowsData = {}
  let arrowInitState = false;

  // Assign event listener and toggle process to left-content-btn and right-content-btn
  allToggleBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idBtn = btn.id;
      
      // we do it now manually for the sake of dev speed.
      // 
      // if the btn is active. Just deactivate the clicked btn.
      // else the btn is not active. Activate the clicked btn and deactivate others.
      if (btn.className.includes("toggle__btn__active")) {
        // if left btn clicked
        // else right btn clicked
        if (idBtn === "left-content-btn") {
          setRakDeactive(leftContentBtnEl, leftContentEl);
          // leftArrowState = false;
        } else if (idBtn === "right-content-btn") {
          setRakDeactive(rightContentBtnEl, rightContentEl);
          // rightArrowState = false;
        }
      } else {
        // if left btn clicked
        // else right btn clicked
        if (idBtn === "left-content-btn") {
          setRakActive(leftContentBtnEl, leftContentEl);
          setRakDeactive(rightContentBtnEl, rightContentEl);
        } else if (idBtn === "right-content-btn") {
          setRakActive(rightContentBtnEl, rightContentEl);
          setRakDeactive(leftContentBtnEl, leftContentEl);
        }
      }
      
      // invert arrowInitstate (false to true) or invert obj[idBtn],
      // used by clicked button to change the corresponding arrow direction.
      arrowsData[idBtn] = arrowsData[idBtn] === undefined ? !arrowInitState : !arrowsData[idBtn];

      arrowsState.forEach(_ => {
        // if exist that is the clicked btn (as clickedBtn)
        // else undefined are the rest to be Not clicked btn (as !clickedBtn)
        if (_.btnId === idBtn) {
          _.toggleArrowState(arrowsData[idBtn]);
        } else {
          // set the other except clickedBtn to false
          arrowsData[_.btnId] = false;
          // always set arrow to not active = false
          _.toggleArrowState(false);
        }
      });
    });
  });
};

export default initToggleRak;
