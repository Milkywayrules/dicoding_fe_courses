// @ts-check
import '../types';
import topTrendingAnime from '../schema/queries/topTrendingAnime';
import useFetchDataLoader from '../utils/useFetchDataLoader';

/**
 *
 * get animes and sort them by TRENDING_DESC.
 * handle the logic and the view.
 *
 * @param {String} sortBy sort parameter
 *
 */
const handleTopTrendingAnime = async (sortBy = 'TRENDING_DESC') => {
  const variables = {
    sort: sortBy,
    page: 1,
    perPage: 10,
  };
  const query = topTrendingAnime;

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

export default handleTopTrendingAnime;
