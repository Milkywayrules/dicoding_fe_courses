import env from "../env.js";

/**
 *
 * some
 *
 * @param {String} where local storage key name.
 * @param {Boolean} json whether the data in local storage is stringified JSON or not.
 * @returns Object of data and information.
 *
 */
export const getData = (where = null, json = true) => {
  // set default to env.DB_KEY, but you can still pass json param
  // just by passing null to where argument.
  // ~~~
  // (We can do object destructuring, but I prefer this,
  // I don't have much time to refactoring it now lol)
  where = where === null ? env.DB_KEY : where;

  // log this text so I can keep track
  // how many times the app fetch data from local storage.
  console.log('---\nGet data from DB.\nLog this on purpose. You can dismiss this message safely.\n---');
  try {
    if (json) {
      return {
        data: JSON.parse(localStorage.getItem(where)),
        isJSON: true,
        isSuccess: true,
        isError: false,
        method: "getData",
      };
    } else {
      return {
        data: localStorage.getItem(where),
        isJSON: false,
        isSuccess: true,
        isError: false,
        method: "getData",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      data: null,
      isJSON: false,
      isSuccess: false,
      isError: err,
      method: "getData",
    };
  }
};

/**
 *
 * Don't forget to JSON.stringify() first, please.!.
 *
 * @param {Array} data Prefer array, but it can be a string or whatever.
 * @param {String} key local storage key name.
 * @returns Object of data and information.
 *
 */
export const setData = (data, key = env.DB_KEY) => {
  try {
    // alwaysssss forgot, do this if I forgot wkwk
    if (typeof data === "object") data = JSON.stringify(data);

    localStorage.setItem(key, data);

    return {
      isSuccess: true,
      isError: false,
      method: "setData",
    };
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      isError: err,
      method: "setData",
    };
  }
};


/**
 * 
 * only delete data
 * 
 * pass in all current data and a single data object to be deleted.
 * Let the func do the rest (create a new object containing new all data)
 * 
 * @param {Object} param0 object
 */
export const deleteData = ({ copyOfAllData, rowDataToBeDeleted }) => {
  try {
    const newCopyOfAllData = copyOfAllData.filter(x => x.id !== rowDataToBeDeleted.id);
    return {
      data: {
        newCopyOfAllData,
        oldCopyOfAllData: copyOfAllData,
        oldCopyOfDeletedData: rowDataToBeDeleted,
      },
      isSuccess: true,
      isError: false,
      method: "deleteData",
    };
  } catch (err) {
    console.error(err);
    return {
      data: {
        newCopyOfAllData: null,
        oldCopyOfAllData: null,
        oldCopyOfDeletedDat: null,
      },
      isSuccess: false,
      isError: err,
      method: "deleteData",
    };
  }
}