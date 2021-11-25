const averageReadingTime = (text, wpm) => {
  const wordsPerMinute = wpm || 150; // Average case.
  let result;

  let textLength = text.split(" ").length; // Split by words
  if (textLength > 0) {
    result = Math.ceil(textLength / wordsPerMinute***REMOVED***
  ***REMOVED***

  return Number(result***REMOVED***
***REMOVED***;

module.exports = averageReadingTime
