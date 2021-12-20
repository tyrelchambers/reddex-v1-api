const decodeToken = require("../libs/decodeToken"***REMOVED***
const authHandler = async (req, res, next) => {
  try {
    const token = req.headers.token || req.query.token;
    const userId = await decodeToken(token***REMOVED***

    res.locals.userId = userId;
    next(***REMOVED***
  ***REMOVED*** catch (err) {
    next(err***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = authHandler;
