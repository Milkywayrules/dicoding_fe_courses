import initToggleRak from './modules/toggle-rak.js';

// set today's year to footer
document.getElementById('copyright-year').innerText = new Date().getFullYear();

initToggleRak();

































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