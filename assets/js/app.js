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

  const dbData = getData().data;
  
  // 
  initHandleToggleRak();
  
  if (dbData && typeof dbData === "object" && dbData.length > 0) {
    // render all data to document
    initRenderAllData(dbData)

    // 
    initHandleSearchBook(splitData(dbData));
  } else {
    console.log('DB data is empty');
  }

} catch (err) {
  console.error(err);
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
        })
      })
  }
}











// let leftBtnState = false
// let rightBtnState = false

// let xxx = [
//   {
//     'toggle-for': 'leftContent',
//     'toggle-from': 'leftContent',
//   },
//   {
//     'toggle-for': 'rightContent',
//     'toggle-from': 'rightContent',
//   },
// ]

// const allContentBtn = document.querySelectorAll(`[data-toggle-for]`);
// // console.log(allContentBtn[0].dataset.toggleFor);

// const handleRakBtnClick = (whichBtn, e) => {
//   const btnEl = e.target;
//   const btnDataset = btnEl.dataset;
  
//   if (whichBtn === 'left') {
//     leftBtnState = !leftBtnState;
//     rightBtnState = false
//   } else if (whichBtn === 'right') {
//     rightBtnState = !rightBtnState;
//     leftBtnState = false
//   }


//   allContentBtn.forEach((eachBtn) => {
//     // cek kalo sama lakukan logic
//     if (eachBtn.dataset.toggleFor === btnDataset.toggleFor) {
//       // cek kalo lg aktif jadiin nonaktif
//       if (btnDataset.isActive === 'true') {
//         console.log( btnDataset.isActive);
//       } else {
//         console.log( btnDataset.isActive);
//       }

//       // cek kalo lg nonaktif jadiin aktif
//       console.log(leftBtnState, rightBtnState, btnDataset.toggleFor);
//     }
//     // cek kalo beda matiin apapun kondisinya
//     if (eachBtn.dataset.toggleFor !== btnDataset.toggleFor) {
//     }
//   })

//   // console.log(whichBtn);

//   // const btnEl = e.target;
//   // const { toggleFor } = btnEl.dataset;
//   // const contentEl = document.querySelector(`[data-toggle-from=${toggleFor}`);

//   // if (leftBtnState) {
//   //   setRakActive(btnEl, contentEl)
//   // } else {
//   //   setRakNotActive(btnEl, contentEl)
//   // }
// }

// function setRakNotActive(btnEl, contentEl) {
//   btnEl.classList.remove('toggle__btn__active')
//   contentEl.classList.replace('show', 'hidden');
// }

// function setRakActive(btnEl, contentEl) {
//   btnEl.classList.add('toggle__btn__active')
//   contentEl.classList.replace('hidden', 'show');
// }

// leftContentBtnEl.addEventListener('click', (e) => handleRakBtnClick('left', e));
// rightContentBtnEl.addEventListener('click', (e) => handleRakBtnClick('right', e));

// // 
// const state = {
//   button : {
//     leftContent: false,
//     rightContent: false,
//   }
// }

// const handleRakBtnClick = (e) => {
//   const dataset = e.target.dataset;
//   const toggleForEl = document.querySelector(`[data-toggle-from=${dataset.toggleFor}]`);

//   const obj = {
//     show: null,
//     hide: [],
//   };
//   const x = Object.keys(state.button).map((btnKey) => {
//     if (btnKey === dataset.toggleFor) {
//       obj.show = {
//         btn: e.target,
//         content: document.querySelector(`[data-toggle-from=${btnKey}]`)
//       }
//     } else {
//       obj.hide.push({
//         btn: 'e.target',
//         content: 'asd'
//       })
//     }
//     return obj
//     // yg diklik === di state.button 
//     // if (btnKey === dataset.toggleFor) {
//     //   console.log('if');
//     //   const toShowBtnEl = document.querySelector(`[data-toggle-for=${btnKey}]`)
//     //   const toShowContentEl = document.querySelector(`[data-toggle-from=${btnKey}]`)

//     //   state.button[btnKey] = !state.button[btnKey];

//     //   setRakActive(e.target, toShowBtnEl)
//     //   setRakActive(e.target, toShowContentEl)
//     //   // console.log(btnKey, state.button[btnKey]);
//     // } else {
//     //   console.log('else');
//     //   const toHideBtnEl = document.querySelector(`[data-toggle-for=${btnKey}]`)
//     //   const toHideContentEl = document.querySelector(`[data-toggle-from=${btnKey}]`)

//     //   state.button[btnKey] = false;

//     //   setRakNotActive(e.target, toHideBtnEl)
//     //   setRakNotActive(e.target, toHideContentEl)
//     //   // console.log(btnKey, state.button[btnKey]);
//     // }
//   })
//   // console.log(state.button);
//   console.log(x);
//   console.log('-');

//   // if (toggleForEl.className.includes('show')) setRakNotActive(e.target, toggleForEl);
//   // else if (toggleForEl.className.includes('hidden')) setRakActive(e.target, toggleForEl);
// }

// function setRakNotActive(x, toggleForEl) {
//   x.classList.remove('toggle__btn__active')
//   toggleForEl.classList.replace('show', 'hidden');
// }

// function setRakActive(x, toggleForEl) {
//   x.classList.add('toggle__btn__active')
//   toggleForEl.classList.replace('hidden', 'show');
// }