import env from "./env.js";

/**
 *
 * some
 *
 * @param {Array} data Prefer array, but it can be a string or whatever.
 * @param {String} key local storage key name.
 * @returns Object of data and information.
 *
 */
const setData = (data, key = env.DB_KEY) => {
  try {
    if (localStorage.setItem(key, data)) {
      return {
        isSuccess: true,
        isError: false,
        method: "setData",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isSuccess: false,
      isError: err,
      method: "setData",
    };
  }
};

export default setData;
