// @ts-check

import HomePage from './HomePage';

console.log(HomePage);

/**
 * @param {Array<() => HTMLElement>} elements
 * @returns
 */
const prepPagesElement = (elements) => {
  /**
   * @type {Array<{name: String, element: HTMLElement}>}
   */
  const newElements = elements.map((element) => {
    const unknownType = /** @type {unknown} */ (element);
    const elementName = element.name;
    const elementCasted = /** @type {HTMLElement} */ (unknownType);

    return { name: elementName, element: elementCasted };
  });

  return newElements;
};

/**
 * @type {Array<Promise>}
 */
const pagesObj = [];

/**
 * @param {Array<{name: String, element: HTMLElement}>} arr
 */
const loadAllPages = async (arr) => {
  const z = arr.map((x) => import(`./pages/${x.name}.js`));
  return await Promise.all(z);
};

class Route {
  /**
   *
   * @param {String} path string
   * @param {HTMLElement} elementToBeRendered HTMLelement
   * @returns
   */
  static to(path, elementToBeRendered) {
    // path = /anime
    path.split;
    return path;
  }
}

export const func = async () => {
  // list all element that will be a page
  const allPagesElement = [HomePage];
  // prep pages to certain format
  const allPrepPages = prepPagesElement(allPagesElement);
  // load/import all pages that listed in the array
  const loadedPages = await loadAllPages(allPrepPages);

  console.log(loadedPages);

  // loadedPages.forEach(pageEl => {
  //   Route.to('/', pageEl[1])

  // })

  // Route.to('/anime', HomePage[1])
  // Route.to('/anime/{:id}', HomePage[1])
};

func();
