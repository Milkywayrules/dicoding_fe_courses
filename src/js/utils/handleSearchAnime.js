//

import searchAnime from '../schema/queries/searchAnime';
import useFetchDataLoader from './useFetchDataLoader';

// :try request to SS first by matching the request.query.name,
//   ::if found a match, do find the variables stored into id in the object
//     :::if found a match of object inside array, get the .payload
//       parse the JWT, so we now get the full results
//     :::else, fetch from the API
//   ::else, fetch from the API
// :catch if there is something wrong

/**
 *
 * search
 *
 * @param {String} keyword search title keyword
 *
 */
const handleSearchAnime = async (keyword) => {
  const variables = {
    search: keyword,
    page: 1,
    perPage: 5,
  };

  const query = searchAnime;

  const res = await useFetchDataLoader(query, variables);

  return res;
};

export default handleSearchAnime;
