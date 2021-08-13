// @ts-check
import '../types';
import useFetchDataLoader from '../utils/useFetchDataLoader';
import { HANDLER_TYPES } from '../types/d.HandlerTypes';

/**
 *
 * get animes by title keyword.
 * handle the logic and the view.
 *
 * @param {object} params0
 * @param {HANDLER_TYPES} params0.handlerType
 * @param {QueryStructure} params0.query
 * @param {object} params0.variables
 *
 */
const handleFetchAnime = async ({ handlerType, query, variables }) => {
  let data;
  const res = await useFetchDataLoader(query, variables);

  if (res.status === 404) {
    data = /** @type {__NotFound} */ (res.payload.data.data);
    // console.log(404);
    // console.log(data);
  } else {
    data = res.payload.data.data;
    // console.log(200);
    // console.log(data);
  }
  return data;
};

export default handleFetchAnime;

// const keyword = 'one piece'

// const variables = {
//   search: keyword,
//   page: 1,
//   perPage: 30,
// };
// const query = searchAnime;

// handleMock({
//   handlerType: HANDLER_TYPES.SEARCH_ANIME,
//   query,
//   variables
// })
