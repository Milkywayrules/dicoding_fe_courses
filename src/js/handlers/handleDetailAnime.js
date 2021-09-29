// @ts-check
import '../types';
import useFetchDataLoader from '../utils/useFetchDataLoader';
import detailAnime from '../schema/queries/detailAnime';

/**
 *
 * get anime per ID.
 * handle the logic and the view.
 *
 * @param {number} mediaID anime ID
 *
 */
const handleDetailAnime = async (mediaID) => {
  const variables = { mediaID };
  const query = detailAnime;

  const res = await useFetchDataLoader(query, variables);

  if (res.status === 404) {
    const data = /** @type {__notFound} */ (res.payload.data.data);
    console.log(404);
    console.log(data);

    // render some 404 component here
  } else {
    const data = /** @type {DetailAnimePayload} */ (res.payload.data.data);
    console.log(200);
    console.log(data);

    // render the result here
  }
};

export default handleDetailAnime;
