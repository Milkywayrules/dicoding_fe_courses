// @ts-check
import '../types';
import LZString from 'lz-string';
import { useFetchAPI } from './crud-data';
import handleCacheToSS from '../handlers/handleCacheToSS';
import optimizeSchemaString from './optimizeSchemaString';
import tryParseJsonString from './tryParseJsonString';
import handleFetch404 from '../handlers/handleFetch404';

/**
 *
 * decide whether get from session storage or API
 *
 * @param {Query} queryObj graphql query
 * @param {Variables} variables variables
 * @returns {Promise<APIResponse>}
 */
const useFetchDataLoader = async (queryObj, variables) => {
  try {
    const tableName = queryObj.name;
    const rowID = JSON.stringify(variables);

    /**
     * this raw data contain stringified data, need to be parsed.
     * @type {undefined | String}
     */
    const tableDataStr = sessionStorage.getItem(tableName);

    // if we have the table in DB.
    // else fetch from API.
    if (tableDataStr) {
      /**
       * SS value contain array of object
       * @type {Array<SSRowData>}
       */
      const tableData = tryParseJsonString(tableDataStr); // return undefined | json

      // if the table data is an array and have > 0 data (must).
      // else go out and fetch from API.
      if (Array.isArray(tableData) && tableData.length > 0) {
        const rowData = tableData.find((row) => row.id === rowID);

        // if we have cached data on SS, use it.
        // else go out and fetch from API.
        if (rowData) {
          const cleanRowData = JSON.parse(
            LZString.decompressFromUTF16(rowData.payload),
          );

          return {
            isSuccess: true,
            hasError: false,
            payload: { data: cleanRowData },
            status: 200,
            statusText: 'OK',
            from: 'useFetchDataLoader:local',
          };
        }
      }
    }

    // fetch from API, because we dont have cached data on SS
    const res = await useFetchAPI(
      optimizeSchemaString(queryObj.schema),
      variables,
    );

    if (res.status !== 404 && (res.status < 200 || res.status >= 300)) {
      // console.error('Error occurred: ', res.hasError.message);
      throw res;
    }

    // handle if requested data is not found, so we can handle this better later.
    if (!res.payload && res.status === 404) {
      const payload404 = await handleFetch404({
        message: 'Data Not Found.',
        tableName,
        variables,
      });

      res.payload = payload404.payload;
      // after this, the structure to be returned are all the same
    }

    // set data to SS
    await handleCacheToSS(tableName, {
      id: JSON.stringify(variables),
      payload: LZString.compressToUTF16(JSON.stringify(res.payload.data)),
    });

    return {
      isSuccess: true,
      hasError: false,
      payload: res.payload,
      status: res.status,
      statusText: res.statusText,
      from: 'useFetchDataLoader:remote',
    };
  } catch (err) {
    // console.error(err);
    return {
      isSuccess: false,
      hasError: err.hasError,
      payload: null,
      status: err.status,
      statusText: err.statusText,
      from: 'useFetchDataLoader:null',
    };
  }
};

export default useFetchDataLoader;
