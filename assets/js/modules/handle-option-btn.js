import toggleShowOrHide from "./toggle-show-hide.js";

/**
 *
 * somtehing
 *
 * @param {Element} rowData element
 */
const initHandleOptionBtn = (rowData) => {
  // init const
  const cardOptBtn = document.getElementById(`${rowData.id}-optionBtn`);
  const cardModal = document.getElementById(`${rowData.id}-modal`);
  const cardModalMimic = document.getElementById(`${rowData.id}-modalMimic`);
  const cardModalDecor = document.getElementById(`${rowData.id}-modalDecor`);
  const bgOverlay = document.getElementById(`${rowData.id}-bgOverlay`);

  // init focusable element inside the modal.
  const allFocusableEl = cardModal.querySelectorAll('button');
  const tabLastIdx = parseInt(allFocusableEl.length);
  const firstFocusableEl = allFocusableEl[0];
  const lastFocusableEl = allFocusableEl[tabLastIdx-1];

  // whether is now cardModal is active or not
  let isActiveCardModal;

  cardOptBtn.onclick = () => {
    // this should be toggling only to show the modal.
    toggleShowOrHide(cardModal);
    toggleShowOrHide(cardModalMimic);
    toggleShowOrHide(cardModalDecor);
    toggleShowOrHide(bgOverlay);

    // accessibility concern
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
    // set isActiveCardModal to active
    isActiveCardModal = true;

    // -1 because we focus on cardModal first on every option btn trigger
    let idx = -1;

    // add key event listener when cardModal is onFocus and active
    document.onkeydown = (ev) => {
      if (isActiveCardModal) {
        // only trigger Tab key event when cardModal is active
        if (ev.key === "Tab" && ev.code === "Tab") {
          console.log(ev);
          // whether ShiftKey is pressed alongside the TabKey or not.
          if (ev.shiftKey) {
            if (idx === 0 || idx === -1) {
              // set idx to tabLastIdx (length) - 1,
              // so it should be on the last index of the btn.
              idx = tabLastIdx - 1;
              // focus to last btn
              lastFocusableEl.focus();
              // prevent default tabbing behaviour
              ev.preventDefault();
            } else {
              // moving backward the idx
              idx--;
            };

          } else {
            if (idx === tabLastIdx - 1) {
              // set to the first index of btn
              idx = 0;
              // focus to first btn
              firstFocusableEl.focus();
              // prevent default tabbing behaviour
              ev.preventDefault();
            } else {
              // moving forward the idx
              idx++;
            };
          };
        };

        // only trigger Escape key event when cardModal is active
        if (ev.key === "Escape" && ev.code === "Escape") {
          // set the cardModal is not active anymore,
          // so the key listener (Tab, Shift, and Escape)
          // will not trigger outside the modal.
          isActiveCardModal = false;
          const show = "show";
          const hidden = "hidden";
          // hide all the modal
          toggleShowOrHide(cardModal, show, hidden);
          toggleShowOrHide(cardModalMimic, show, hidden);
          toggleShowOrHide(cardModalDecor, show, hidden);
          toggleShowOrHide(bgOverlay, show, hidden);
          // give back the focus to option btn
          cardOptBtn.focus()
        };
      };
    };
  }

  bgOverlay.onclick = () => {
    // set the cardModal is not active anymore,
    // so the key listener (Tab, Shift, and Escape)
    // will not trigger outside the modal.
    isActiveCardModal = false;
    // toggle whether the modal is shown or not
    // when the bgOverlay is present, it should 
    // toggle the cardModal to hidden.
    toggleShowOrHide(cardModal);
    toggleShowOrHide(cardModalMimic);
    toggleShowOrHide(cardModalDecor);
    toggleShowOrHide(bgOverlay);
  };

  cardModal.onblur = () => {
    console.log('dialog unfocused');
  }
};

export default initHandleOptionBtn;
