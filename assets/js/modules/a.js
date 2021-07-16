// import render from './render.js';
// import cardBookHtmlTemplate from '../components/card-book.js';


export const props = [
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Haryy Kopter",
    author: "J.K. Rolling",
    yearPublished: "1687",
    isComplete: false,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Book",
    author: "Dio Ilham Djatiadi",
    yearPublished: "2021",
    isComplete: true,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Critical Elephant",
    author: "Someone",
    yearPublished: "2004",
    isComplete: false,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Watermelon Sugar",
    author: "Britishy",
    yearPublished: "2020",
    isComplete: true,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Bumi",
    author: "Eyang",
    yearPublished: "2077",
    isComplete: true,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Just in your dreams",
    author: "Aseprite",
    yearPublished: "1887",
    isComplete: true,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Buku Cetak",
    author: "Tan Malaka",
    yearPublished: "1945",
    isComplete: false,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Time Dilation",
    author: "Hawk Instuff",
    yearPublished: "1459",
    isComplete: true,
  },
  {
    id: +new Date() + Math.random().toLocaleString() * 10000,
    title: "Bumi 2089",
    author: "Jekyll",
    yearPublished: "2089",
    isComplete: false,
  },
];

const stringed = JSON.stringify(props);
export const parsedJsonData = JSON.parse(stringed);

// const newResArr = [];

/**
 * 
 * write this later.
 * 
 * @param {prop} prop prop
 * @param {String} keyword Search keyword.
 * @returns undefined or the element
 */
const filterSearchRow = (prop, keyword) => {
  /**
   * use this for tracking whether the prop
   * is already in newResReal array or not.
   */
  let thisPropsWasEverTrueOrNot = false;

  let selectedProp;

  // Thank you, Clement and Ben. I give my respect via this variable name.
  const clementBen3 = Object.values(prop).some((value, idx) => {
    // reset thisPropsWasEverTrueOrNot to false for every new prop.
    if (idx === 1) {
      thisPropsWasEverTrueOrNot = false;
    }
    // only get the string value
    // we do not check the id because it's literally random yet useless,
    // except for some value to be unique and not like ISBN that have meaning.
    // If the ID has/have some meaning or code it should be string and not int.
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

// parsed
//   .map(prop => filterSearchRow(prop, 'dio'))
//   .filter(x => x !== undefined ? render("left-cards", "beforeend", cardBookHtmlTemplate(x)) : null);






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
