// -----------------------------------------------
/**
 * Fecth data from server.
 * @typedef Variables
 * @property {string} [variables.search] - anime name
 * @property {Number} [variables.mediaID] - anime name
 * @property {Number} [variables.reviewID] - anime name
 * @property {number} [variables.page] what page
 * @property {number} [variables.perPage] anime per page
 */

/**
 * schema query in schema/queries
 * @typedef Query
 * @property {String} name unique name for the query
 * @property {String} schema unique schema for something
 */

/**
 * Session storage row data
 * @typedef SSRowData
 * @property {String} id table row ID
 * @property {String} payload table row payload. Compressed then stringified data.
 */

/**
 * handle cache to session storage response
 * @typedef HandleCacheToSS
 * @property {Boolean} isSuccess is the process succes
 * @property {any | Boolean} hasError is the process has error
 * @property {{tableData: Array<SSRowData>, rowData: SSRowData} | null} data the data from the process
 * @property {String} from is the process has error
 */

/**
 * asdasdasdasdasd
 * @typedef APIPayload
 * @property {{ data: (__notFound | SearchAnimePayload | AnimeDetailPayload) }} data specific queried data
 */

/**
 * standarized API response (remote/local)
 * @typedef APIResponse
 * @property {boolean} isSuccess success or has error
 * @property {any | boolean} hasError false or the error data
 * @property {null | APIPayload} payload contains data from axios response.data or null
 * @property {number} status status in number code
 * @property {string} statusText status in text
 * @property {string} [from] status in text
 */
// -----------------------------------------------
