const decodeToken = require("../libs/decodeToken"***REMOVED***
const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.token && !req.query.token)
      return next({ error: "No token provided" ***REMOVED******REMOVED***
    const token = req.headers.token || req.query.token;
    const userId = await decodeToken(token***REMOVED***

    if (!userId) return res.status(500).send({ error: "USER_NOT_FOUND" ***REMOVED******REMOVED***

    res.locals.userId = userId;
    next(***REMOVED***
  ***REMOVED*** catch (err) {
    next(err***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = authHandler;