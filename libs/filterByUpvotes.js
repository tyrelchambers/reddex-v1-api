

const filterByUpvotes = ({post, query***REMOVED***) => {
  if (!query.ups) return post

  if (query.ups.operator === "gte") {
    return post.ups >= query.ups.value
  ***REMOVED*** else if (query.ups.operator === "lte") {
    return post.ups <= query.ups.value
  ***REMOVED*** else if (query.ups.operator === "eqå"){
    return post.ups == query.ups.value
  ***REMOVED***

***REMOVED***

module.exports = filterByUpvotes