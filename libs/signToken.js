const jwt = require("jsonwebtoken"***REMOVED***
function signToken(userId, expiresIn) {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: expiresIn,
    ***REMOVED***;

    jwt.sign(
      { uuid: userId ***REMOVED***,
      process.env.JWT_SECRET,
      options,
      (err, token) => {
        if (err) {
          console.log(err***REMOVED***
          reject({ isError: true, message: "Invalid operation!" ***REMOVED******REMOVED***
        ***REMOVED***
          resolve(token***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***

module.exports = signToken;