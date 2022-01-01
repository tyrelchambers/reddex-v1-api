const { v4: uuidv4 ***REMOVED*** = require("uuid"***REMOVED***

const visitorHandler = async (req, res, next) => {
  try {
    let token = req.headers.posttoken;
    res.locals.token = token;

    next(***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = visitorHandler;
