import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import filterSearchRow, {parsedJsonData} from "./a.js";
import render from "./render.js";
import splitData from "./split-data.js";

//
const searchFormsEl = document.querySelectorAll(".search__form");
const searchBoxesEl = document.querySelectorAll(".search__box");

/**
 *
 * somtehing
 *
 */
// TODO: init searchbook every time localstorage data changes
// pass a new data from local storage to init searchbook
function initSearchBook (parsedJsonData) {

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
      // empty the html first before rendereing the new one
      document.getElementById(relativeToWhichCardsWrapper).innerHTML = null;

      // if maxlength terpenuhi
      if (ev.target.value.length === ev.target.maxLength) {
        console.log("Run swal toast here");
      }
      
      const rakData = relativeToWhichRakCategory === 'left'
        ? parsedJsonData.true
        : parsedJsonData.false

      // tell something
      // TODO: should i do filter here rather than map??????
      const searchRes = rakData
        .map((data) => filterSearchRow(data, keywordVal))
        .filter((fromArrMap) => fromArrMap !== undefined);
        
      // tell somtehing
      if (searchRes.length === 0) {
        render(
          relativeToWhichCardsWrapper,
          sortDirection,
          "<center><p style='color: #FDA4AF;'>Buku ngga ada... 😭😭😭</p></center>",
        );
      } else {
        searchRes.forEach((x) =>
          render(relativeToWhichCardsWrapper, sortDirection, cardBookHtmlTemplate(x)),
        );
      }
    }
  })
};

export default initSearchBook;

// const a = parsedJsonData
// .map((data) => filterSearchRow(data, keywordVal))
// .filter((fromArrMap) =>
//   fromArrMap !== undefined
//     ? render(
//         relativeToWhichCards,
//         "beforeend",
//         cardBookHtmlTemplate(fromArrMap),
//       )
//     : null
// );
