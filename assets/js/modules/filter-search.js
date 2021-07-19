/**
 * 
 * write this later.
 * 
 * Don't mind about the performance, i believe this algo can be simplified
 * yet more efficient in the future (not by changing the logic, but refactor it).
 * Once again, thank you Clement and Ben xixi
 * 
 * @param {prop} prop prop
 * @param {String} keyword Search keyword.
 * @returns undefined or the element
 * 
 */
const filterSearchRow = (prop, keyword) => {
  /**
   * use this for tracking whether the prop
   * is already in newResReal array or not.
   */
  let thisPropsWasEverTrueOrNot = false;

  let selectedProp;

  // Thank you, Clement and Ben. I give my respect via this variable name.
  // TODO: read below \./
  // should i refactor n optimize here??????????????????????????? 
  // should i just throw a bunch of row data instead a single row??????????????
  const clementBen3 = Object.values(prop).some((value, idx) => {
    // reset thisPropsWasEverTrueOrNot to false for every new prop.
    if (idx === 1) thisPropsWasEverTrueOrNot = false;
    // only get the string value
    // we do not check the id because it's literally random and useless,
    // except for some value to be unique and not like ISBN that have meaning.
    // If the ID has/have some meaning or some code, it should be string and not int
    // so we can search the ID too.
    if (typeof value === "string" && thisPropsWasEverTrueOrNot === false) {
      // Cast string to lowercase and find the keyword
      // in the value by using includes.
      if (value.toLocaleLowerCase().includes(keyword)) {
        // push specific prop to array
        // newResArr.push(prop);
        thisPropsWasEverTrueOrNot = true;

        selectedProp = prop;
      }
    }
  });
  return selectedProp;
}

export default filterSearchRow






























/**
 *
 * I got this from Clement and Ben video.
 * Clement said he do this tricky cheat in AlgoExpert (? if I remember)
 * just to demo that this kind of approach is still works.
 * Side note: This is not fully right. You can search the key too,
 * not only the value, even the curly brackets and colons.
 *
 * ref: https://www.youtube.com/watch?v=6s0OVdoo4Q4
 *
 * // const clementBen1 = JSON.stringify(props[1]).toLocaleLowerCase().includes('iscompl');
 * // console.log(clementBen1);
 *
 * // const clementBen2 = Object.values(props[1]).some((x) => {
 * //   if (typeof x === 'string') {
 * //     x.toLocaleLowerCase().includes('book');
 * //   }
 * // });
 * // console.log(clementBen2);
 *
 * // const clementBen3 = Object.values(props[1]).some((x) => {
 * //   x.toLocaleString().toLocaleLowerCase().includes('a')
 * // })
 * // console.log(clementBen3);
 *
 */
