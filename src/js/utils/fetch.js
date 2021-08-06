import { UTILS } from '../const';

/**
 *
 * Get data from API using Axios
 *
 * @param {object} param0 search query, current page, and data per page
 * @returns payload and response parameter
 *
 */
export const getData = async ({ search, page = 1, perPage = 10 }) => {
  // var for query
  const variables = {
    search,
    page: 1,
    perPage: 5,
  };

  try {
    // fetch
    const {
      data: {
        data: { Page },
      },
    } = await axios({
      url: UTILS.API_BASE_URL,
      method: 'POST',
      data: {
        query: SEARCH_ANIME_QUERY,
        variables,
      },
    });

    // TODO: maybe add some response from server to return obj
    return {
      isSuccess: true,
      hasError: false,
      payload: Page,
    };
  } catch (err) {
    return {
      isSuccess: false,
      hasError: err,
      payload: null,
    };
  }
};
