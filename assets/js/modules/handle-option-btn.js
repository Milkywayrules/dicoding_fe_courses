import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import { getCurrentDevice } from "./check-use-agent.js";
import getData from "./get-data.js";
import render from "./render.js";
import setData from "./set-data.js";
import { toastFullBtn } from "./swal/mixins.js";
import toggleShowOrHide from "./toggle-show-hide.js";

// we do init some these const here because they are general
// and not specific like consts in initHandleOptionBtn()

// init once so every card data have one source of truth
// and update the allData variable whenever data changes
// so, it's kinda state here.
let allData = getData(env.DB_KEY).data

const wrappersIDList = ['left-cards', 'right-cards']


/**
 * 
 * something
 * 
 * @param {Object} rowData Single card data
 * 
 */
const toggleCompleteStatus = (rowData) => {
  // spread the old and override with the new value.
  const newRowData = {...rowData, isComplete: !rowData.isComplete}
  // create a new array consist the newRowData override the old value.
  const newAllData = allData.map(data => data.id === newRowData.id ? newRowData : data);
  // update the initial data we get from db (this is kinda state but not really).
  allData = newAllData
  // update DB
  setData(JSON.stringify(newAllData));

  return newRowData;
}

/**
 * 
 * something
 * 
 */
const handleToggleCompleteBtn = ({ rowData, cardWrapper, bgOverlay }) => {
  const newRowData = toggleCompleteStatus(rowData);

  // we do this obj here so every time toggleCompleteBtn created,
  // this obj is created too and get the recent data from the newest document.
  const emptyRakMessage = {
    "left-cards": document.getElementById("true-rakStillEmpty"),
    "right-cards": document.getElementById("false-rakStillEmpty"),
  }
  
  // check current cardModal parent element (cardWrapper)
  // and find the unmatch (opposite) parent element.
  // The values are left-cards && right-cards.
  const oppositeCardWrapper = wrappersIDList.find(x => cardWrapper.parentElement.id !== x)

  // get left-cards or right-cards element (find emptyRakMessage and remove).
  // this is useful because we have a default initial msg when rak is empty.
  if (emptyRakMessage[oppositeCardWrapper]) {
    emptyRakMessage[oppositeCardWrapper].remove()
  }

  // if the last element is deleted too, we render this emptyRakMessage.
  // under 1 because we check first here and then remove this last child element.
  if (cardWrapper.parentElement.children.length <= 1) {
    const i = cardWrapper.parentElement.id === 'right-cards' ? "false" : "true";
    const t = `<p id="${i}-rakStillEmpty" style='color: #cbd5e1; margin: 16px auto 0;'> Masih kosong nih, yuk isi... 😎😎😎 </p>`;
    cardWrapper.parentElement.innerHTML = t
  }

  // we remove this card element
  // before we render it in another rak so we don't get duplicate ID.
  cardWrapper.remove();
  // render the new card to the opposite Rak.
  render(oppositeCardWrapper, "afterbegin", cardBookHtmlTemplate(newRowData), newRowData, allData);
  // trigger click on bg overlay
  // so it's like we click outside the modal.
  bgOverlay.click();
}


/**
 * 
 * fire form with swal v
 * receive edited data v
 * update current card with edited data v
 * update allData v
 * update to DB v
 * fire toast: update success (?)
 * 
 */
const handleClickEditBtn = async ({ rowData, cardWrapper, bgOverlay }) => {
  // 
  const { value: formEditValues, ...status } = await Swal.fire({
    title: 'Perbarui Data Buku',
    html: `
      <label for="input-edit-title">Judul Buku</label>
      <input id="input-edit-title" class="swal2-input" placeholder="Judul buku" value="${rowData.title}">

      <label for="input-edit-author">Pengarang</label>
      <input id="input-edit-author" class="swal2-input" placeholder="Nama pengarang buku" value="${rowData.author}">

      <label for="input-edit-year">Tahun Terbit</label>
      <input id="input-edit-year" class="swal2-input" placeholder="Tahun terbit" value="${rowData.yearPublished}">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const obj = {}
      obj.title = document.getElementById('input-edit-title').value
      obj.author = document.getElementById('input-edit-author').value
      obj.yearPublished = document.getElementById('input-edit-year').value

      // loop through every key and delete key with empty string.
      Object.keys(obj).forEach(key => {
        if (obj[key].length < 1) delete obj[key];
        else obj[key] = obj[key]
      });

      return obj;
    }
  })
  
  if (formEditValues && status.isConfirmed) {
    const title = cardWrapper.querySelector(".card__title");
    const author = cardWrapper.querySelector(".card__author");
    const yearPublished = cardWrapper.querySelector(".card__year");

    const newRowData = {...rowData, ...formEditValues}
    // create a new array consist the newRowData override the old value.
    allData = allData.map(data => data.id === newRowData.id ? newRowData : data);

    // update the card element
    Object.keys(newRowData).forEach(key => {
      if (key === 'title') title.innerText = newRowData[key];
      if (key === 'author') author.innerText = newRowData[key];
      if (key === 'yearPublished') yearPublished.innerText = newRowData[key];
    });
    // Swal.fire(console.log(formEditValues))
    const setDataStatus = setData(JSON.stringify(allData));
    if (setDataStatus.isSuccess) {
      // fire swal
      toastFullBtn.fire({
        icon: 'success',
        title: 'Update sukses',
        position: getCurrentDevice().isMobile ? "bottom-end" : "top-end" ,
      });
    };
  };
  // trigger click on bg overlay
  // so it's like we click outside the modal.
  bgOverlay.click();
}



/**
 * 
 * fire conf with swal 
 * remove current card element
 * update allData
 * update to DB
 * fire toast: undo
 * 
 */
const handleClickDeleteBtn = ({ rowData, cardWrapper, bgOverlay }) => {
  
}


/**
 *
 * somtehing
 *
 * @param {Element} rowData element
 * 
 */
const initHandleOptionBtn = (rowData) => {
  // we do init these const because they are specific to certain rowData element.

  // init const
  const cardWrapper = document.getElementById(`${rowData.id}-cardWrapper`);
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

  const checkBtn = document.getElementById(`${rowData.id}-checkBtn`)
  const crossBtn = document.getElementById(`${rowData.id}-crossBtn`)
  const editBtn = document.getElementById(`${rowData.id}-editBtn`)
  const deleteBtn = document.getElementById(`${rowData.id}-deleteBtn`)

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

    if (isActiveCardModal) {
      // add key event listener when cardModal is onFocus and active
      document.onkeydown = (ev) => {
        // only trigger Tab key event when cardModal is active
        if (ev.key === "Tab" && ev.code === "Tab") {
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
          cardOptBtn.focus();
        };
      };

      // =======================================================================

      // left-cards | isComplete===true | done read
      if (crossBtn) {
        crossBtn.onclick = () => {
          // set isComplete to false (un-done read), then up to localStorage
          // rerender this particular card element to the opposite Rak
          handleToggleCompleteBtn({ rowData, cardWrapper, bgOverlay });
          // TODO: add swal Toast here
        }
      }

      // right-cards | isComplete===false | not done read
      if (checkBtn) {
        checkBtn.onclick = () => {
          // set isComplete to true (done read), then up to localStorage
          // rerender this particular card element to the opposite Rak
          handleToggleCompleteBtn({ rowData, cardWrapper, bgOverlay });
          // TODO: add swal Toast here
        }
      }

      editBtn.onclick = () => {
        handleClickEditBtn({ rowData, cardWrapper, bgOverlay });
      }

      deleteBtn.onclick = () => {
        console.log('delete btn clicked');
      }


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
    // give back the focus to option btn
    cardOptBtn.focus();
  };
};

export default initHandleOptionBtn;
