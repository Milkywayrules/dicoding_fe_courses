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
});

// Imma just trying jsdocs more advanced for auto-completion.
/**
 *
 * Fecth data from server.
 *
 * @param {string} query - graphql schema query
 * @param {Variables} [variables] - variables to pass into query
 * @returns {Promise<APIResponse>} Promise of object contains payload, isSuccess, and hasError
 *
 */
export const useFetchAPI = async (query, variables) => {
  const data = JSON.stringify({ query, variables });
  try {
    // axios
    const res = await axiosClient({ data });

    return {
      isSuccess: true,
      hasError: false,
      payload: res,
      status: res.status,
      statusText: res.statusText,
    };
  } catch (err) {
    // internal axios err or some unexpected
    if (axios.isAxiosError(err)) {
      err = `Axios: ${err}`;
      console.error(err);
    } else {
      err = `Unexpected: ${err}`;
      console.error(err);
    }
    return {
      isSuccess: false,
      hasError: err,
      payload: null,
      status: err.status,
      statusText: err.statusText,
    };
  }
};
