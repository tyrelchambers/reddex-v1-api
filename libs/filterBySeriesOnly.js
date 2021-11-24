const filterBySeries = ({post, query***REMOVED***) => {
  if (query.seriesOnly) {
    return post.link_flair_text === "Series"
  ***REMOVED*** 
  
  if (query.omitSeries) {
    return post.link_flair_text !== "Series"
  ***REMOVED***

  return post
***REMOVED***

module.exports = filterBySeries