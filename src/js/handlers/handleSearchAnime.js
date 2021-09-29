// @ts-check
import '../types';
import searchAnime from '../schema/queries/searchAnime';
import useFetchDataLoader from '../utils/useFetchDataLoader';

/**
 *
 * get animes by title keyword.
 * handle the logic and the view.
 *
 * @param {String} keyword search title keyword
 *
 */
const handleSearchAnime = async (keyword) => {
  const variables = {
    search: keyword,
    page: 1,
    perPage: 30,
  };
  const query = searchAnime;

  const res = await useFetchDataLoader(query, variables);

  if (res.status === 404) {
    const data = /** @type {__notFound} */ (res.payload.data.data);
    console.log(404);
    console.log(data);

    // render some 404 component here
  } else {
    const data = /** @type {SearchAnimePayload} */ (res.payload.data.data);
    console.log(200);
    console.log(data);

    // render the result here
  }
};

export default handleSearchAnime;

// :try request to SS first by matching the request.query.name,
//   ::if found a match, do find the variables stored into id in the object
//     :::if found a match of object inside array, get the .payload
//       parse the JWT, so we now get the full results
//     :::else, fetch from the API
//   ::else, fetch from the API
// :catch if there is something wrong
