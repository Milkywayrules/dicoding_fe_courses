// @ts-check
import LZString from 'lz-string';
import handleCacheToSS from './handleCacheToSS';

/**
 *
 * @param {Object} param0 this is an object
 * @param {String} param0.tableName this is an object
 * @param {Object} param0.variables this is an object
 * @param {String} param0.message this is an object
 * @returns {Promise<{payload: {data: {data: __NotFound}}}>}
 */
const handleFetch404 = async ({ tableName, variables, message }) => {
  //
  const mimicAxiosResponse = { data: { __notFound: { message, status: 404 } } };

  await handleCacheToSS(tableName, {
    id: JSON.stringify(variables),
    payload: LZString.compressToUTF16(JSON.stringify(mimicAxiosResponse)),
  });

  // set data to SS, but kinda different in the payload property
  // we mimic the axios response which give us structure similar to
  //    <response.data.data.somePayloadHere>
  // the payload for this is the __notFound
  return {
    payload: { data: mimicAxiosResponse },
  };
};

export default handleFetch404;
