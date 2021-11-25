  const filterByKeywords = ({post, query***REMOVED***) => {
  if (!query.keywords) return post;

  if (query.keywords) {
    return post.author.includes(query.keywords) || post.self_text.includes(query.keywords) || post.title.includes(query.keywords)
  ***REMOVED***
***REMOVED***

module.exports = filterByKeywords