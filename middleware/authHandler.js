const decodeToken = require("../libs/decodeToken");
const authHandler = ({ continueOnNoUser = false } = {}) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.token || req.query.token;
      const userId = await decodeToken(token);

      if (!userId && !continueOnNoUser) throw new Error("Something went wrong");

      res.locals.userId = userId;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = authHandler;
