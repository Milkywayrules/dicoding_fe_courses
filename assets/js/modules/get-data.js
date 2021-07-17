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
const getData = (where = env.DB_KEY, json = true) => {
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

export default getData;
