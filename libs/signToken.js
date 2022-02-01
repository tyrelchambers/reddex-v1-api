const jwt = require("jsonwebtoken");
function signToken(userId, expiresIn) {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: expiresIn,
    };

    jwt.sign(
      { uuid: userId },
      process.env.JWT_SECRET,
      options,
      (err, token) => {
        if (err) {
          console.log(err);
          reject({ isError: true, message: "Invalid operation!" });
        } else {
          resolve(token);
        }
      }
    );
  });
}

module.exports = signToken;