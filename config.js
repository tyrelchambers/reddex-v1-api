require("dotenv").config();

module.exports = {
  development: {
    secret: "my furry cat house",
    database: "mongodb://mongodb/reddex",
  },
  production: {
    secret: "my furry cat house",
    database: "mongodb://mongodb/reddex",
  },

  env: process.env.NODE_ENV || "development",
};
