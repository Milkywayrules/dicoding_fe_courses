let arr = [];
let idx = 0;
let stateIdx = 0;

// setState func for updating the specific state value
const setState = (setStateValue) => {
  arr[stateIdx] = setStateValue

  useState(setStateValue)
  console.log('setState', setStateValue);
}

/**
 * 
 * Inspired by React Hooks useState. This is the lite version
 * abd just experimenting for Dicoding submission.
 * 
 * @param {any} initialState The initial value when calling useState
 * @returns An array of state value and the setState function for updating the state
 * 
 */
export const useState = (initialState) => {
  
  // set current index for specific state
  stateIdx = idx
  // set state
  const state = arr.length === 0 ? initialState : arr[stateIdx];

  // increment idx for the next useState index
  idx++;

  return [
    state,
    setState
  ]
}

export const resetIndex = () => {
  // reset idx every event is done
  idx = 0;
}