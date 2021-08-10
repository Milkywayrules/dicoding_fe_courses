// @ts-check

import tryParseJsonString from './isContainJson';

/**
 *
 * cache to SS if data not exist on SS
 *
 * @param {String} tableName key name on Session Storage
 * @param {SSRowData} newRowData data to be added
 * @returns {Promise<HandleCacheToSS>}
 *
 */
const handleCacheToSS = async (tableName, newRowData) => {
  try {
    /**
     * @type {undefined | String}
     */
    const tableDataStr = sessionStorage.getItem(tableName);

    // if we have the table.
    // else fetch from API.
    if (tableDataStr) {
      /**
       * @type {Array<SSRowData>}
       */
      const tableData = tryParseJsonString(tableDataStr); // return undefined | json

      // if the content is array and have > 0 data.
      // else go out and fetch from API.
      if (Array.isArray(tableData) && tableData.length > 0) {
        const newRowDataExist = tableData.find((x) => x.id === newRowData.id);

        // if we dont have the exact same data on SS, assign new data and set to SS.
        // else do nothing
        if (!newRowDataExist) {
          const newTableData = [...tableData, newRowData];
          sessionStorage.setItem(tableName, JSON.stringify(newTableData));
          return {
            isSuccess: true,
            hasError: false,
            data: {
              tableData: newTableData,
              rowData: newRowData,
            },
            from: 'handleCacheToSS:local',
          };
        }
      } else {
        // if the tableData is not an Array, we should remove it
        // and make a new one. We assume the SS has been edited.
        sessionStorage.removeItem(tableName);
        handleCacheToSS(tableName, newRowData);
      }
    }
    // else SS with specific tableName is empty (first time or tableData is corrupt)
    // wrap newRowData inside an array and stringify
    sessionStorage.setItem(tableName, JSON.stringify([newRowData]));
    return {
      isSuccess: true,
      hasError: false,
      data: {
        tableData: [newRowData],
        rowData: newRowData,
      },
      from: 'handleCacheToSS:local',
    };
  } catch (err) {
    return {
      isSuccess: false,
      hasError: err,
      data: null,
      from: 'handleCacheToSS:null',
    };
  }
};

export default handleCacheToSS;
