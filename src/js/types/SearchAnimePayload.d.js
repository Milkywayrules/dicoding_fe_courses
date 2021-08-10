/**
 * @typedef Title
 * @property {String} romaji xxxxxxxxxxxxxxxxxxxxx
 * @property {String} english xxxxxxxxxxxxxxxxxxxxx
 * @property {String} native xxxxxxxxxxxxxxxxxxxxx
 */

/**
 * @typedef Media
 * @property {number} id xxxxxxxxxxxxxxxxxxxxx
 * @property {number} idMal xxxxxxxxxxxxxxxxxxxxx
 * @property {Title} title xxxxxxxxxxxxxxxxxxxxx
 */

/**
 * @typedef PageInfo
 * @property {number} total xxxxxxxxxxxxxxxxxxxxx
 * @property {number} perPage xxxxxxxxxxxxxxxxxxxxx
 * @property {number} currentPage xxxxxxxxxxxxxxxxxxxxx
 * @property {number} lastPage xxxxxxxxxxxxxxxxxxxxx
 * @property {Boolean} hasNextPage xxxxxxxxxxxxxxxxxxxxx
 */

/**
 * @typedef Page
 * @property {PageInfo} pageInfo xxxxxxxxxxxxxxxxxxxxx
 * @property {Array<Media>} media xxxxxxxxxxxxxxxxxxxxx
 */

/**
 * @typedef SearchAnimePayload
 * @property {Page} Page xxxxxxxxxxxxxxxxxxxxx
 *
 */
