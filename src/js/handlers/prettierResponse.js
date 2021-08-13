// @ts-check

/**
 * Split this prettying thing into another function. So, here we go.
 * @param {APIResponse} res
 */
const prettierResponse = (res) => {
  let data;

  if (res.status === 404) {
    // if 404 === anime not found
    data = { message: 'Anime not found.' };
  } else if (
    res.hasError.message &&
    res.hasError.message.includes('Network Error')
  ) {
    // if the network error, possibly the server didn't response or client connection is sh*t
    data = {
      message:
        'Network error. Check your connection or maybe the server is tired.',
    };
  } else if (
    res.hasError &&
    !res.payload &&
    (res.status <= 200 || res.status > 300)
  ) {
    // if something happens and it's not handled by the app
    data = { message: 'Something bad happening' };
  } else {
    // if it works
    data = res.payload.data.data;
  }

  // return the prettier data
  return {
    data: data,
    status: res.status,
    hasError: res.hasError,
  };
};

export default prettierResponse;
