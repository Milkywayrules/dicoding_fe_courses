import initHandleToggleRak from './modules/handle-toggle-rak.js';
import initHandleSearchBook from './modules/handle-search-book.js';
import render from './modules/render.js';
import { getData } from './modules/crud-data.js';
import splitData from './modules/split-data.js';

import env from './env.js'
import cardBookHtmlTemplate from './components/card-book.js';

try {
  // set today's year to footer
  document.getElementById('copyright-year').innerText = new Date().getFullYear();
  // get initial allData to be used by the whole app from local storage.
  const { data: dbData, isError} = getData();
  // enable Rak to be toggeable and other cool stuf about the btn.
  initHandleToggleRak();
  
  if (dbData && typeof dbData === "object" && dbData.length > 0) {
    // render all data to document.
    initRenderAllData(dbData)
    // enable search functionality for book searching.
    initHandleSearchBook(splitData(dbData));
  } else {
    throw [isError, 'DB data is empty'];
  }

} catch (err) {
  // lopp through error message if they are an object, else just print
  typeof err === 'object' ? err.forEach(x => {
    typeof x === 'boolean'
      ? null
      : console.error(x);
  }) : console.error(err);
}



// we do hoisting
// we have to split the isComplete === true and the falsy one,
// so we will have 2 datasets.
function initRenderAllData(dbData) {
  if (dbData) {
    // split by category (isComplete)
    const splittedData = splitData(dbData);
  
    // loop every categories and loop every array of object (data)
    Object
      .keys(splittedData)
      .forEach(key => {
        // remove this initial message when rak buku is not empty. We can just do innerHTML = null.
        document.getElementById(`${key}-rakStillEmpty`).remove()
        
        splittedData[key].forEach(rowData => {
          const belongsToCards = rowData.isComplete ? 'left-cards' : 'right-cards';
          const sortDirection = env.DEFAULT_SORT === 'DESCENDING' ? "afterbegin" : "beforeend";
          
          render(
            belongsToCards,
            sortDirection,
            cardBookHtmlTemplate(rowData),
            rowData,
            dbData,
          );
        });
      });
  };
};


