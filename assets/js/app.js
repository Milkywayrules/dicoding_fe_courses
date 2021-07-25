import initHandleToggleRak from './modules/handle-toggle-rak.js';
import initHandleSearchBook from './modules/handle-search-book.js';
import render from './modules/render.js';
import { getData } from './modules/crud-data.js';
import splitData from './modules/split-data.js';

import env from './env.js'
import cardBookHtmlTemplate from './components/card-book.js';
import { initHandleAddNewBtn } from './modules/handle-add-new-btn.js';
import { initRenderAllData } from './init-render-all-data.js';

try {
  // set today's year to footer
  document.getElementById('copyright-year').innerText = new Date().getFullYear();
  
  
  // get initial allData to be used by the whole app from local storage.
  let { data: dbData, isError} = getData();
  
  // kinda sad that I have to go with this global variable solution in the end.
  // sorry world :(
  window.allData = dbData;

  // enable floating add new data btn.
  initHandleAddNewBtn(dbData);

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
  // // lopp through error message if they are an object, else just print
  // typeof err === 'object' ? err.forEach(x => {
  //   typeof x === 'boolean'
  //     ? null
  //     : console.error(x);
  // }) : 
  // console.error(err);
}




