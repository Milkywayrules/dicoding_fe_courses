import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import { getCurrentDevice } from "./check-use-agent.js";
import { getData, setData } from "./crud-data.js";
import initHandleSearchBook from "./handle-search-book.js";
import render from "./render.js";
import splitData from "./split-data.js";
import { modalAddBook, toastBasic } from "./swal/mixins.js";

/**
 *
 * some thing
 *
 * @param {Array} dbData array of object data from local storage contain all books data.
 *
 */
export const initHandleAddNewBtn = () => {
  // 
  const addNewBtnWrapper = document.getElementById("add-new-btn-wrapper");
  const addNewBtn = document.getElementById("add-new-btn");

  // 
  addNewBtn.onclick = async (ev) => {
    // Fire Swal Modal for edit form
    const {
      value: { newData, hasError },
      ...status
    } = await modalAddBook().fire();

    // if the form was filled properly
    // else fire an error toast
    if (
      !hasError &&
      newData.author &&
      newData.title &&
      Object.entries(newData).length === 5
    ) {
      // 
      const dbData = getData().data

      // create a new array of object data
      let newAllData = dbData ? [...dbData, newData] : [newData];

      // update data to db
      const { isSuccess, isError } = setData(JSON.stringify(newAllData));
      // for persistent data from db. I added this after decided using global var allData.

      // if update data to db isSuccess
      if (isSuccess) {
        // override dbData
        window.allData = newAllData;

        // delete emptyRakMessage
        if (newAllData.length === 1) {
          console.log(newAllData.length);
          document.getElementById("false-rakStillEmpty").remove();
        }

        // render the new added card
        const sortDirection =
          env.DEFAULT_SORT === "DESCENDING" ? "afterbegin" : "beforeend";
        render(
          "right-cards",
          sortDirection,
          cardBookHtmlTemplate(newData),
          newData,
          newAllData,
        );

        // firing toast
        toastBasic.fire({
          title: "Buku baru berhasil ditambah.",
          icon: "success",
          position: getCurrentDevice().isMobile ? "bottom" : "top-end",
          customClass: {
            popup: "rakbuku-swal-popup",
            title: "rakbuku-swal-title",
          },
        });
          
        // enable search functionality for book searching.
        initHandleSearchBook(splitData(newAllData));
      } else {
        console.error(new Error("There was a problem adding a new data."));
      }
    } else {
      // firing toast
      toastBasic.fire({
        title: "Semua data harus diisi dengan benar.",
        icon: "error",
        position: getCurrentDevice().isMobile ? "bottom" : "top-end",
        customClass: {
          popup: "rakbuku-swal-popup",
          title: "rakbuku-swal-title",
        },
      });
    };
  };
};
