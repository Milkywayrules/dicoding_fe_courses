
// we do hoisting
// we have to split the isComplete === true and the falsy one,

import cardBookHtmlTemplate from "./components/card-book.js";
import env from "./env.js";
import { getData } from "./modules/crud-data.js";
import render from "./modules/render.js";
import splitData from "./modules/split-data.js";

// so we will have 2 datasets.
export const initRenderAllData = () => {
  // tadinya arg
  let { data: dbData, isError} = getData();
  console.log('initRenderAllData');

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
