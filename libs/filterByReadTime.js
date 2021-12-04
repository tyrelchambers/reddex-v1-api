const filterByReadTime = ({ post, query, wpm ***REMOVED***) => {
  if (!query.readTime) return post;

  const _wpm = wpm || 150;

  if (query.readTime.operator === ">=") {
    return post.self_text >= query.readTime.value * _wpm;
  ***REMOVED*** else if (query.readTime.operator === "<=") {
    return post.self_text <= query.readTime.value * _wpm;
  ***REMOVED***
    return post;
  ***REMOVED***
***REMOVED***;

module.exports = filterByReadTime;
