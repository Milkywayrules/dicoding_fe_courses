useState 

setState 

resetIndex 


let idx = 0
let _idx = 0
let arr = []
let obj = {}

const useState = (initialState) => {
  _idx = idx

  let currentState = arr.length === 0 ? initialState : arr[_idx]
}