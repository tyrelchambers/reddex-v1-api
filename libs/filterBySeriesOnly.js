const filterBySeries = ({ post, query }) => {
  if (query.seriesOnly) {
    return post.flair === "Series";
  }

  if (query.omitSeries) {
    return post.flair !== "Series";
  }

  return post;
};

module.exports = filterBySeries;
