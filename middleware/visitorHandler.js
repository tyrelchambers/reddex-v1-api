const { v4: uuidv4 } = require("uuid");

const visitorHandler = async (req, res, next) => {
  try {
    let token = req.headers.posttoken;
    res.locals.token = token;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = visitorHandler;
