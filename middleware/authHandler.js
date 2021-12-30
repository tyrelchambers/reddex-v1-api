const decodeToken = require("../libs/decodeToken"***REMOVED***
const authHandler = ({ continueOnNoUser = false ***REMOVED*** = {***REMOVED***) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.token || req.query.token;
      const userId = await decodeToken(token***REMOVED***

      if (!userId && !continueOnNoUser) throw new Error("Something went wrong"***REMOVED***

      res.locals.userId = userId;
      next(***REMOVED***
    ***REMOVED*** catch (err) {
      next(err***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED***;

module.exports = authHandler;
