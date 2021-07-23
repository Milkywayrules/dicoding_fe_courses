import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import { getCurrentDevice } from "./check-use-agent.js";
import render, { renderDataEmptyMessage } from "./render.js";
import { deleteData, getData, setData } from "./crud-data.js";
import {
  toastFullBtn,
  toastBasic,
  modalEditBook,
  modalConfirmation,
} from "./swal/mixins.js";
import toggleShowOrHide from "./toggle-show-hide.js";
import initHandleSearchBook from "./handle-search-book.js";
import splitData from "./split-data.js";

// we do init some these const here because they are general
// and not specific like consts in initHandleOptionBtn()

// init once so every card data have one source of truth
// and update the allData variable whenever data changes
// so, it's kinda state here.
// let allData = getData(env.DB_KEY).data;
// window.allData = getData().data

const wrappersIDList = ["left-cards", "right-cards"];

/**
 *
 * something
 *
 * @param {Object} rowData Single card data
 *
 */
const toggleCompleteStatus = ({ rowData, allData }) => {
  // spread the old and override with the new value.
  const newRowData = { ...rowData, isComplete: !rowData.isComplete };
  // create a new array consist the newRowData override the old value.
  let newAllData = allData.map((data) =>
    data.id === newRowData.id ? newRowData : data,
  );
  setData(JSON.stringify(newAllData));
  console.log('asd');
  console.log(newAllData);
  // for persistent data from db. I added this after decided using global var allData.
  newAllData = getData().data;
  console.log(newAllData);
  console.log(window.allData);

  return { newRowData, newAllData };
};

/**
 *
 * something
 *
 */
const handleToggleCompleteBtn = ({ rowData, allData, cardWrapper }) => {
  // do the toggle thing logic
  const { newRowData, newAllData } = toggleCompleteStatus({ rowData, allData });

  const emptyRakMessage = {
    "left-cards": document.getElementById("true-rakStillEmpty"),
    "right-cards": document.getElementById("false-rakStillEmpty"),
  };

  const oppositeCardWrapper = wrappersIDList.find(
    (x) => cardWrapper.parentElement.id !== x,
  );

  if (emptyRakMessage[oppositeCardWrapper]) {
    emptyRakMessage[oppositeCardWrapper].remove();
  }

  let tmpChildren = cardWrapper.parentElement.children;
  let kosong = 0;
  let berisi = 0;
  
  // search all child element an check if it's empty or not
  // if it's empty thus they are just only for UNDO reference.
  // if all empty we append emptyRakMsg to the top cardWrapper.
  Array.from(tmpChildren).forEach(x => x.innerHTML !== "" ? berisi++ : kosong++);

  // kalo udah gaada element yg berisi apus semua
  if (berisi === 1) {
    const prefixEmptyMessageID = cardWrapper.parentElement.id === "right-cards" ? "false" : "true";
    const t = `<p id="${prefixEmptyMessageID}-rakStillEmpty" style='color: #cbd5e1; margin: 16px auto 0; text-align: center;'> Masih kosong nih, yuk isi...<br />😎😎😎 </p>`;
    cardWrapper.parentElement.insertAdjacentHTML("afterbegin", t);
  }

  // remove initial cardWrapper
  cardWrapper.remove();

  // firing toast
  const title = newRowData.isComplete
    ? "Yeay! Buku selesai dibaca."
    : "Luangkan waktu baca bukunya, yaa!";
  const icon = newRowData.isComplete ? "success" : "info";
  toastBasic.fire({
    title: title,
    icon: icon,
    position: getCurrentDevice().isMobile ? "bottom" : "top-end",
    customClass: {
      confirmButton: "rakbuku-swal-fullBtn rakbuku-swal-successBtn",
      popup: "rakbuku-swal-popup",
      title: "rakbuku-swal-title",
    },
  });

  // return array for spread into render()
  return [
    oppositeCardWrapper,
    "afterbegin",
    cardBookHtmlTemplate(newRowData),
    newRowData,
    newAllData,
  ];
};


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
const handleClickEditBtn = async ({ rowData, allData, cardWrapper, bgOverlay }) => {
  // update rowdata from alldata
  rowData = allData.find(x => x.id === rowData.id);
  // Fire Swal Modal for edit form
  const { value: formEditValues, ...status } = await modalEditBook({
    rowData,
  }).fire();

  // if data from Swal Modal recieved and user click the confirmBtn (isConfirmed)
  if (formEditValues && status.isConfirmed) {
    // const init
    const titleEl = cardWrapper.querySelector(".card__title");
    const authorEl = cardWrapper.querySelector(".card__author");
    const yearPublishedEl = cardWrapper.querySelector(".card__year");

    // spread old data and spread the new data into a single object.
    const newRowData = { ...rowData, ...formEditValues };

    // create a new array consist the newRowData override the old value.
    let newAllData = allData.map((data) =>
      data.id === newRowData.id ? newRowData : data,
    );

    // update the card element
    Object.keys(newRowData).forEach((key) => {
      if (key === "title") titleEl.innerText = newRowData[key];
      if (key === "author") authorEl.innerText = newRowData[key];
      if (key === "yearPublished") yearPublishedEl.innerText = newRowData[key];
    });

    // update data to local storage
    const setDataStatus = setData(JSON.stringify(newAllData));
    // for persistent data from db. I added this after decided using global var allData.
    newAllData = getData().data;

    // fire swal toast for success info
    if (setDataStatus.isSuccess) {
      // firing toast
      toastBasic.fire({
        title: "Data buku berhasil diperbarui.",
        icon: "success",
        position: getCurrentDevice().isMobile ? "bottom" : "top-end",
        customClass: {
          popup: "rakbuku-swal-popup",
          title: "rakbuku-swal-title",
        },
      });

      // trigger click on bg overlay
      // so it's like we click outside the modal.
      bgOverlay.click();

      return {
        newRowData,
        newAllData,
      };
    }
    // TODO: handle error.
  }
  // trigger click on bg overlay
  // so it's like we click outside the modal.
  bgOverlay.click();
};


/**
 * 
 * fire conf with swal 
 * save to memento current data
 * remove current card element
 * update allData
 * update to DB
 * fire toast === undo ? get from memento and setData() : null;
 * 
 */
 const handleClickDeleteBtn = async ({ rowData, allData, cardWrapper, bgOverlay }) => {
  // fire swal modal confirmation to delete or not
  const status = await modalConfirmation({
    title: "Yakin ingin hapus buku ini?",
    confirmButtonText: "Ya, hapus",
  }).fire();
  
  // if status.isConfirmed === true
  if (status.isConfirmed) {
    // trigger click on bg overlay
    // so it's like we click outside the modal.
    bgOverlay.click();

    // delete data from allData and update the DB (because we pass true).
    const {
      data: {
        newCopyOfAllData,
        oldCopyOfAllData,
        oldCopyOfDeletedData,
      },
      isSuccess,
      isError
    } = deleteData(rowData, allData, true);
    
    // if deleteData.isSuccess === true
    if (isSuccess) {
      // make copy and remove the deleted card element from document.
      const copyOfCardWrapper = cardWrapper.cloneNode(true);
      cardWrapper.innerHTML = null;
      
      // override the old allData with the NEWest one, newCopyOfAllData.
      window.allData = newCopyOfAllData;

      let tmpChildren = cardWrapper.parentElement.children;
      let kosong = 0;
      let berisi = 0;
      let rakStillEmptyElID = "";
      
      // search all child element an check if it's empty or not
      // if it's empty thus they are just only for UNDO reference.
      // if all empty we append emptyRakMsg to the top cardWrapper.
      Array.from(tmpChildren).forEach(x => x.innerHTML !== "" ? berisi++ : kosong++);

      // kalo udah gaada element yg berisi apus semua
      if (berisi === 0) {
        const prefixEmptyMessageID = cardWrapper.parentElement.id === "right-cards" ? "false" : "true";
        rakStillEmptyElID = `${prefixEmptyMessageID}-rakStillEmpty`;
        const t = `<p id="${prefixEmptyMessageID}-rakStillEmpty" style='color: #cbd5e1; margin: 16px auto 0; text-align: center;'> Masih kosong nih, yuk isi...<br />😎😎😎 </p>`;
        cardWrapper.parentElement.insertAdjacentHTML("afterbegin", t);
      }

      // fire toast for info that delete is success
      // and promp for undo-ing or not this delete action.
      const isUndo = await toastFullBtn.fire({
        text: 'Data berhasil dihapus.',
        icon: 'success',
        confirmButtonText: "Undo",
        position: getCurrentDevice().isMobile ? "bottom-end" : "top-end",
        customClass: {
          confirmButton: 'rakbuku-swal-fullBtn rakbuku-swal-warningBtn',
        },
      });

      // if isUndo.isConfirmed === true, if not do nothing and enjoy the app again.
      if (isUndo.isConfirmed) {
        // update data in DB with the OLD one, oldCopyOfAllData.
        // Because we do undo.
        const { isSuccess, isError } = setData(JSON.stringify(oldCopyOfAllData));
        
        if (isSuccess) {
          const rakStillEmptyMsg = document.getElementById(rakStillEmptyElID);
          rakStillEmptyMsg ? rakStillEmptyMsg.remove() : null;
          // render again card from copyOfCardWrapper to previous cardWrapper.
          cardWrapper.replaceWith(copyOfCardWrapper);

          // override again allData, now with the OLD one, oldCopyOfAllData.
          window.allData = oldCopyOfAllData;

          // firing toast
          toastBasic.fire({
            title: "Undo berhasil. Data telah dikembalikan.",
            icon: "success",
            position: getCurrentDevice().isMobile ? "bottom" : "top-end",
            customClass: {
              popup: "rakbuku-swal-popup",
              title: "rakbuku-swal-title",
            },
          });

          // if the user do undo
          return {
            oldRowData: rowData,
            newAllData: window.allData,
            isUndo: true,
          };
        };
      } else {
        // if the user not do undo.
        return {
          oldRowData: rowData,
          newAllData: window.allData,
          isUndo: false,
        };
      };
    };
  } else {
    // trigger click on bg overlay
    // so it's like we click outside the modal.
    bgOverlay.click();
  };
};




/**
 *
 * somtehing
 *
 * @param {Element} rowData element
 *
 */
const initHandleOptionBtn = (rowData, dbData) => {
  window.allData = dbData;
  // we do init these const because they are specific to certain rowData element.

  // init const
  const cardWrapper = document.getElementById(`${rowData.id}-cardWrapper`);
  const cardOptBtn = document.getElementById(`${rowData.id}-optionBtn`);
  const cardModal = document.getElementById(`${rowData.id}-modal`);
  const cardModalMimic = document.getElementById(`${rowData.id}-modalMimic`);
  const cardModalDecor = document.getElementById(`${rowData.id}-modalDecor`);
  const bgOverlay = document.getElementById(`${rowData.id}-bgOverlay`);

  // init focusable element inside the modal.
  const allFocusableEl = cardModal.querySelectorAll("button");
  const tabLastIdx = parseInt(allFocusableEl.length);
  const firstFocusableEl = allFocusableEl[0];
  const lastFocusableEl = allFocusableEl[tabLastIdx - 1];

  const checkBtn = document.getElementById(`${rowData.id}-checkBtn`);
  const crossBtn = document.getElementById(`${rowData.id}-crossBtn`);
  const editBtn = document.getElementById(`${rowData.id}-editBtn`);
  const deleteBtn = document.getElementById(`${rowData.id}-deleteBtn`);

  const propsHandleClick = { rowData, allData, cardWrapper, bgOverlay };

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
    const clientHeight = cardModal.clientHeight.toString() + "px";
    const clientWidth = cardModal.clientWidth.toString() + "px";
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
            }
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
            }
          }
        }

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
        }
      };

      // =======================================================================

      // left-cards | isComplete===true | done read
      if (crossBtn) {
        crossBtn.onclick = () => {
          // update props everytime event trigerred
          propsHandleClick.allData = window.allData;
          // do logic
          const renderProps = handleToggleCompleteBtn(propsHandleClick);
          // render el
          render(...renderProps);
          console.log(2, renderProps[renderProps.length - 1]);
          // get all data from array and assign to global var
          window.allData = renderProps[renderProps.length - 1];
          // init again search functionality
          initHandleSearchBook(splitData(window.allData));
        };
      }

      // right-cards | isComplete===false | not done read
      if (checkBtn) {
        checkBtn.onclick = () => {
          console.log(propsHandleClick.allData);
          console.log(window.allData);
          // update props everytime event trigerred
          propsHandleClick.allData = window.allData;
          // do logic
          const renderProps = handleToggleCompleteBtn(propsHandleClick);
          // render el
          render(...renderProps);
          // get all data from array and assign to global var
          window.allData = renderProps[renderProps.length - 1];
          // init again search functionality
          initHandleSearchBook(splitData(window.allData));
        };
      }

      editBtn.onclick = () => {
        // update props everytime event trigerred
        propsHandleClick.allData = window.allData;
        // do logic
        handleClickEditBtn(propsHandleClick).then(res => {
          // get all data from array and assign to global var
          window.allData = res.newAllData;
          // init again opt btn functionality
          initHandleOptionBtn(res.newRowData, res.newAllData);
          // init again search functionality
          initHandleSearchBook(splitData(res.newAllData));
        });
      }

      deleteBtn.onclick = () => {
        // ref-from: ~~delete cardWrapper
        Array.from(cardWrapper.parentElement.children).forEach(x => { if (x.innerHTML === "") x.remove() });

        // update props everytime event trigerred
        propsHandleClick.allData = window.allData;
        // do logic
        handleClickDeleteBtn(propsHandleClick).then(res => {
          // if undo we init the opt btn again
          if (res.isUndo) {
            // init again opt btn functionality
            initHandleOptionBtn(res.oldRowData, res.newAllData);
          } else {
            // this is the first approach. We add one more to ensure
            // all empty cardWrapper are deleted before deleting the new one again.
            // ref: ~~delete cardWrapper
            document.getElementById(`${res.oldRowData.id}-cardWrapper`).remove();
          }
          // init again search functionality
          initHandleSearchBook(splitData(res.newAllData));
        });
      }
    }
  };

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
