const filterBySeries = ({ post, query ***REMOVED***) => {
  if (query.seriesOnly) {
    return post.flair === "Series";
  ***REMOVED***

  if (query.omitSeries) {
    return post.flair !== "Series";
  ***REMOVED***

  return post;
***REMOVED***;

module.exports = filterBySeries;
