/**
 *
 * Dynamically create a new object containing every splitter value
 * to be the new object key. Every single key is array of object,
 * which contain data only per splitter (category),
 *
 * @param {Array} arrayOfData should be an array of object.
 * @param {String} splitter object key name to be a reference for splitting.
 *
 */
const splitData = (arrayOfData, splitter = "isComplete") => {
  // splitted data object
  const someobj = {};

  arrayOfData.forEach((data) => {
    const key = data[splitter].toString();
    // init new key on someobj with empty array
    if (!Object.keys(someobj).includes(key)) someobj[key] = [];
    // push teh new data to someobj[key] array
    someobj[key].push(data);
  });

  return someobj;
};

export default splitData;
