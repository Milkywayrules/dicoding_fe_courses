// @ts-check
/**
 *
 * Thank you for saving my time.
 * This is not count as a plagiat kan?
 * ref: https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
 *
 * If you don't care about primitives and only objects then this function
 * is for you, otherwise look elsewhere.
 * This function will return `false` for any valid json primitive.
 * EG, 'true' -> false
 *     '123' -> false
 *     'null' -> false
 *     '"I'm a string"' -> false
 */
const tryParseJsonString = (possiblyJsonString) => {
  try {
    var j = JSON.parse(possiblyJsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (j && typeof j === 'object') {
      return j;
    }
  } catch (e) {}

  return undefined;
};

export default tryParseJsonString;
