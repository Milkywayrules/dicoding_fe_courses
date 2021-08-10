// @ts-check
/**
 *
 * Optimizing query by eliminate all the unnecessary spaces.
 *
 * @param {String} string query to be optimized
 * @returns optimized query
 *
 */
const optimizeQueryString = (string) => {
  return string.replace(/ /gi, '').replace('query', 'query ');
};

export default optimizeQueryString;
