const filterByReadTime = ({post, query***REMOVED***) => {
  if (!query.readTime) return post;

  if (query.readTime.operator === "gte") {
    return post.readTime >= query.readTime.value
  ***REMOVED*** else if(query.readTime.operator === "lte") {
    return post.readTime <= query.readTime.value
  ***REMOVED***
    return post
  ***REMOVED***
***REMOVED***

module.exports = filterByReadTime