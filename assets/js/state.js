let arr = [];
let idx = 0;

/**
 * 
 * Inspired by React Hooks useState. This is the lite version
 * just experimenting for Dicoding submission. Bcs w're not
 * rerendering every component in every changes, we still need to
 * change via it's element.
 * TODO: Update this hooks for better approach later.
 * 
 * @param {any} initialState The initial value when calling useState
 * @returns An array of state value and the setState function for updating the state
 * 
 */
export const useState = (initialState) => {
  
  // set current index for specific state
  const stateIdx = idx
  // set state
  const state = arr.length === 0 ? initialState : arr[stateIdx];

  // setState func for updating the specific state value
  const setState = (setStateValue) => {
    arr[stateIdx] = setStateValue
    console.log('masuk', setStateValue, arr[stateIdx]);
  }

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