const jwt = require("jsonwebtoken");
const signToken = require("./signToken");

require("dotenv").config();

const decodeToken = async (token) => {
  const userId = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (decoded === "undefined" || !decoded || err) return false;
      let uuid = decoded.uuid;

      if (Date.now() >= decoded.exp * 1000) {
        await signToken({ userId: decoded.uuid }).then((res) => (uuid = res));
      }
      return uuid;
    }
  );

  return userId;
};

module.exports = decodeToken;
