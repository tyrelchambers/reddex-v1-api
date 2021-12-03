const averageReadingTime = (text, wpm) => {
  const wordsPerMinute = wpm || 150; // Average case.
  let result;

  if (text > 0) {
    result = Math.ceil(text / wordsPerMinute***REMOVED***
  ***REMOVED***

  return Number(result***REMOVED***
***REMOVED***;

module.exports = averageReadingTime;
