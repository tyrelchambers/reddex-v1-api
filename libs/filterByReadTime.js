const filterByReadTime = ({ post, query, wpm }) => {
  if (!query.readTime) return post;

  const _wpm = wpm || 150;

  if (query.readTime.operator === ">=") {
    return post.self_text >= query.readTime.value * _wpm;
  } else if (query.readTime.operator === "<=") {
    return post.self_text <= query.readTime.value * _wpm;
  } else {
    return post;
  }
};

module.exports = filterByReadTime;
