const averageReadingTime = (text, wpm) => {
  const wordsPerMinute = wpm || 150; // Average case.
  let result;

  if (text > 0) {
    result = Math.ceil(text / wordsPerMinute);
  }

  return Number(result);
};

module.exports = averageReadingTime;
