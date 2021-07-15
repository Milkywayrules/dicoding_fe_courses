import { resetIndex, useState } from "./state.js";

const resultContainer = document.getElementById('inject');
const inputBox = document.getElementById('input-box');
const inputBtn = document.getElementById('input-btn');
const form = document.getElementById('form');

let x = 0;
let y = 7;


form.onsubmit = (e) => {
  e.preventDefault();
  const [data, setData] = useState(x);
  // const [data2, setData2] = useState(y);

  console.log(data);
  // console.log(data2);

  setData(x+10);
  // setData2(y);

  console.log(data);
  // console.log(data2);

  x++
  // y++

  // resultContainer.innerText = data + '~' + data2
  resetIndex();

}











// function Component() {
//   const [data, setData] = useState(1);

//   const obj = `
//   <div>
//     <p>ini data state anda: ${data}</p>
//     <button> Click here dude </button>
//   </div>
// `

//   document.body.children[1].insertAdjacentHTML("beforeend", obj);

//   document.body.children[1].querySelector('button').onclick = () => setData(data + 1);
// }

// form.onsubmit = (e) => {
//   e.preventDefault();

  
//   Component()
// }