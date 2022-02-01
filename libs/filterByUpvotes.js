const filterByUpvotes = ({ post, query }) => {
  if (!query.ups) return post;

  if (query.ups.operator === ">=") {
    return post.ups >= query.ups.value;
  } else if (query.ups.operator === "<=") {
    return post.ups <= query.ups.value;
  } else if (query.ups.operator === "=") {
    return post.ups == query.ups.value;
  }
};

module.exports = filterByUpvotes;
