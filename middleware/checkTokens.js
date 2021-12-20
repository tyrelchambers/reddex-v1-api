const { v4: uuidv4 ***REMOVED*** = require("uuid"***REMOVED***
const decodeToken = require("../libs/decodeToken"***REMOVED***

const checkTokens = async (req, res, next) => {
  try {
    const { token: authToken, posttoken ***REMOVED*** = req.headers;

    res.locals.token = authToken || posttoken;
    res.locals.userId = authToken ? await decodeToken(authToken) : null;
    next(***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = checkTokens;
