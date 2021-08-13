// @ts-check
import axios from 'axios';
import { UTILS } from '../../const';
import '../types';

// create custom axios instance
const axiosClient = axios.create({
  baseURL: UTILS.API_BASE_URL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // validateStatus: (status) => {
  //   // only resolve this kind of request status, else catch
  //   return (status >= 200 && status < 300) || status === 404;
  // },
});

// Imma just trying jsdocs more advanced for auto-completion.
/**
 *
 * Fetch data from server. We assume 404
 *
 * @param {string} query - graphql schema query
 * @param {Variables} [variables] - variables to pass into query
 * @returns {Promise<APIResponse>} Promise of object contains payload, isSuccess, and hasError
 *
 */
export const useFetchAPI = async (query, variables) => {
  try {
    const data = JSON.stringify({ query, variables });
    // axios
    const res = await axiosClient({ data });

    // console.log(0, res);

    return {
      isSuccess: true,
      hasError: false,
      payload: res,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err) {
    console.clear();
    // set default
    let status = -1;
    let statusText = '';

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // and I don't care about handling errors too advanced for this project now.
      status = err.response.data.errors[0].status;
      err = { message: err.response.data.errors[0].message };
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // internal axios err or some unexpected
      if (axios.isAxiosError(err)) {
        err = `Axios: ${err.message}`;

        // Something happened in setting up the request that triggered an Error
      } else {
        err = `Unexpected: ${err.message}`;
      }
    }

    return {
      isSuccess: false,
      hasError: err,
      payload: null,
      status,
      statusText,
    };
  }
};
