import toggleShowOrHide from "./toggle-show-hide.js";

/**
 *
 * somtehing
 *
 * @param {Element} rowData element
 */
const initHandleOptionBtn = (rowData) => {
  const cardOptBtn = document.getElementById(`${rowData.id}-optionBtn`);
  const cardModal = document.getElementById(`${rowData.id}-modal`);
  const cardModalMimic = document.getElementById(`${rowData.id}-modalMimic`);
  const cardModalDecor = document.getElementById(`${rowData.id}-modalDecor`);
  const bgOverlay = document.getElementById(`${rowData.id}-bgOverlay`);

  const allFocusableEl = cardModal.querySelectorAll('button');
  const tabLastIdx = parseInt(allFocusableEl.length);
  const firstFocusableEl = allFocusableEl[0];
  const lastFocusableEl = allFocusableEl[tabLastIdx-1];

  cardOptBtn.onclick = () => {
    toggleShowOrHide(cardModal);
    toggleShowOrHide(cardModalMimic);
    toggleShowOrHide(cardModalDecor);
    toggleShowOrHide(bgOverlay);
    cardModal.removeAttribute("aria-hidden");
    cardModal.setAttribute("aria-modal", "true");

    // set mocal mimic height and width
    const clientHeight = cardModal.clientHeight.toString() + 'px';
    const clientWidth = cardModal.clientWidth.toString() + 'px';
    cardModalMimic.style.height = clientHeight;
    cardModalMimic.style.width = clientWidth;

    // cardModal.focus()
    cardModal.focus();
  };

  cardModal.onfocus = () => {
    let isActiveCardModal = true
    let last = false;
    let first = false;

    let idx = 0
    document.onkeydown = (ev) => {
      if (isActiveCardModal) {
        if (ev.key === "Tab" && ev.code === "Tab") {
          if (idx === tabLastIdx) {
            idx=1;
            firstFocusableEl.focus();
            ev.preventDefault();
          } else {
            idx++;
          };
        };
      };

      if (ev.key === "Escape" && ev.code === "Escape") {
        isActiveCardModal = false;
        const show = "show";
        const hidden = "hidden";
        toggleShowOrHide(cardModal, show, hidden);
        toggleShowOrHide(cardModalMimic, show, hidden);
        toggleShowOrHide(cardModalDecor, show, hidden);
        toggleShowOrHide(bgOverlay, show, hidden);
      };
    };
    

    // firstFocusableEl.onfocus = (ev) => {
    //   first = true
    // }

    // lastFocusableEl.onfocus = (ev) => {
    //   last = true
    // }
    // console.log(document.activeElement);

    // console.log('dialog focused');
    // // listen to key press
    // document.onkeydown = (ev) => {
    //   // when Escape key pressed, hide modal
    //   if (ev.key === 'Escape') {
    //     const show = "show";
    //     const hidden = "hidden"
    //     toggleShowOrHide(cardModal, show, hidden);
    //     toggleShowOrHide(cardModalMimic, show, hidden);
    //     toggleShowOrHide(cardModalDecor, show, hidden);
    //     toggleShowOrHide(bgOverlay, show, hidden);
    //   }
    //   // if (document.activeElement === lastFocusableEl) {
    //   //   firstFocusableEl.focus()
    //   //   ev.preventDefault()
    //   // }

    //   // console.log(document.activeElement === lastFocusableEl)

    //   if (ev.key === "Tab" && ev.code === "Tab") {
    //     if (last) {
    //       firstFocusableEl.focus()
    //     }
    //     first = document.activeElement === firstFocusableEl ? true:false;
    //     last = document.activeElement === lastFocusableEl ? true:false;

    //     console.log(first, last);

    //     // if (last) {
    //     //   last = false
    //     //   // firstFocusableEl.focus()
    //     //   firstFocusableEl.setAttribute("tabindex", "2")
    //     //   lastFocusableEl.setAttribute("tabindex", "1")
    //     // }
    //     // if (first) {
    //     //   first = false
    //     //   // firstFocusableEl.focus()
    //     //   firstFocusableEl.setAttribute("tabindex", "1")
    //     //   lastFocusableEl.setAttribute("tabindex", tabLastIdx.toString())
    //     // }
    //     // if (lastFocusableEl) {
          
    //     // }
    //   }
    // }
  }

  bgOverlay.onclick = () => {
    toggleShowOrHide(cardModal);
    toggleShowOrHide(cardModalMimic);
    toggleShowOrHide(cardModalDecor);
    toggleShowOrHide(bgOverlay);
  };

  cardModal.onblur = () => {
    // console.log('dialog unfocused');
  }
};

export default initHandleOptionBtn;
