const jwt = require("jsonwebtoken"***REMOVED***
const signToken = require("./signToken"***REMOVED***

require("dotenv").config(***REMOVED***

const decodeToken = async (token) => {
  const userId = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (decoded === "undefined" || !decoded || err) return false;
      let uuid = decoded.uuid;

      if (Date.now() >= decoded.exp * 1000) {
        await signToken({ userId: decoded.uuid ***REMOVED***).then((res) => (uuid = res)***REMOVED***
      ***REMOVED***
      return uuid;
    ***REMOVED***
  ***REMOVED***

  return userId;
***REMOVED***;

module.exports = decodeToken;
