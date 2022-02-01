const { v4: uuidv4 } = require("uuid");
const decodeToken = require("../libs/decodeToken");

const checkTokens = async (req, res, next) => {
  try {
    const { token: authToken, posttoken } = req.headers;

    res.locals.token = authToken || posttoken;
    res.locals.userId = authToken ? await decodeToken(authToken) : null;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkTokens;
