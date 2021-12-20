const { v4: uuidv4 ***REMOVED*** = require("uuid"***REMOVED***

const visitorHandler = async (req, res, next) => {
  try {
    let token = req.headers.postToken;

    res.locals.postToken = token;

    next(***REMOVED***
  ***REMOVED*** catch (error) {
    next(error***REMOVED***
  ***REMOVED***
***REMOVED***;

module.exports = visitorHandler;
