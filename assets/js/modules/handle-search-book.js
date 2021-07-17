import cardBookHtmlTemplate from "../components/card-book.js";
import env from "../env.js";
import filterSearchRow, { parsedJsonData } from "./a.js";
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
const initSearchBook = () => {
  // get all form tag
  searchFormsEl.forEach((sFormEl) => {
    const id = sFormEl.id;

    sFormEl.onsubmit = (ev) => {
      ev.preventDefault();

      console.log("form submitted");
    };
  });

  // get all search box for book
  searchBoxesEl.forEach((sBoxEl) => {
    const id = sBoxEl.id;
    const formEl = sBoxEl.parentElement;
    const relativeToWhichCards = id.split("-")[0].concat("-cards");

    sBoxEl.onfocus = () => formEl.classList.add("ring");
    sBoxEl.onblur = () => formEl.classList.remove("ring");

    sBoxEl.oninput = (ev) => {
      // search keyword from input
      const keywordVal = ev.target.value;
      // set sort direction by default
      const sortDirection = env.DEFAULT_SORT === 'DESCENDING' ? "afterbegin" : "beforeend";
      // empty the html first before rendereing the new one
      document.getElementById(relativeToWhichCards).innerHTML = null;

      // if maxlength terpenuhi
      if (ev.target.value.length === ev.target.maxLength) {
        console.log("Run swal toast here");
      }

      // console.log(splitData(parsedJsonData));

      // tell something
      // TODO: should i do filter here rather than map??????
      const searchRes = parsedJsonData
        .map((data) => filterSearchRow(data, keywordVal))
        .filter((fromArrMap) => fromArrMap !== undefined);
        
      // tell somtehing
      if (searchRes.length === 0) {
        render(
          relativeToWhichCards,
          sortDirection,
          "<center><p style='color: #FDA4AF;'>Buku ngga ada nih...😭😭😭</p></center>",
        );
      } else {
        searchRes.forEach((x) =>
          render(relativeToWhichCards, sortDirection, cardBookHtmlTemplate(x)),
        );
      }
    };
  });
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
