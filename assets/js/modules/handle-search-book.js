import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import filterSearchRow from "./filter-search.js";
import render from "./render.js";
// import splitData from "./split-data.js";

//
const searchFormsEl = document.querySelectorAll(".search__form");
const searchBoxesEl = document.querySelectorAll(".search__box");

/**
 *
 * Split data per category in object of array of object.
 * In this case is isComplete splitter with true|false.
 *
 */
// TODO: init searchbook every time localstorage data changes
// pass a new data from local storage to init searchbook
function initSearchBook (splittedDataPerCategory) {

  // get all search form tag
  searchFormsEl.forEach((sFormEl) => {
    const id = sFormEl.id;

    sFormEl.onsubmit = (ev) => {
      ev.preventDefault();

      console.log("form submitted");
    };
  });



  // loop every search box
  searchBoxesEl.forEach(sBoxEl => {
    // show search utilities (search form, box, and button)
    sBoxEl.parentElement.parentElement.classList.replace("hidden", "show");

    // init const
    const id = sBoxEl.id
    const formEl = sBoxEl.parentElement
    const relativeToWhichRakCategory = id.split("-")[0]
    const relativeToWhichCardsWrapper = relativeToWhichRakCategory.concat("-cards")

    // add pinky ring effect
    sBoxEl.onfocus = () => formEl.classList.add("ring")
    sBoxEl.onblur = () => formEl.classList.remove("ring")
    
    // add on input listener to current search box loop
    sBoxEl.oninput = (ev) => {
      // search keyword from input
      const keywordVal = ev.target.value;
      // set sort direction by default
      const sortDirection = env.DEFAULT_SORT === 'DESCENDING' ? "afterbegin" : "beforeend";

      // if maxlength terpenuhi
      if (ev.target.value.length === ev.target.maxLength) {
        console.log("Run swal toast here");
      }
      
      const rakData = relativeToWhichRakCategory === 'left'
        ? splittedDataPerCategory.true
        : splittedDataPerCategory.false
      
      // if there is no data in this particular category (after splitted)
      if (!rakData) return;


      // empty the html first before rendereing the new one
      document.getElementById(relativeToWhichCardsWrapper).innerHTML = null;

      // tell something
      // TODO: read below \./
      // should i do filter here rather than map??????
      // should i throw a bunch of rows data into filterSearch or loop every row data like now???????????????
      const searchRes = rakData
        .map((data) => filterSearchRow(data, keywordVal))
        .filter((fromArrMap) => fromArrMap !== undefined);
        
      // tell somtehing
      if (searchRes.length === 0) {
        render(
          relativeToWhichCardsWrapper,
          sortDirection,
          "<p style='color: #cbd5e1; margin: 16px auto 0;'>Buku ngga ada... 😭😭😭</p>",
        );
      } else {
        // console.log(searchRes.length);
        searchRes.forEach((x) =>
          render(relativeToWhichCardsWrapper, sortDirection, cardBookHtmlTemplate(x)),
        );
      }
    }
  })
};

export default initSearchBook;
