const jsonwebtoken = require("jsonwebtoken");

const jwt = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || token == null || token === "null") {
    next();
    return;
  }

  var secret = (process.env.ACCESS_TOKEN_SECRET = "secret");

  jsonwebtoken.verify(token, secret, (err, payload) => {
    if (err) {
      console.log("403");
      next();
    }

    req.userId = payload.userId;
    next();
  });
};

module.exports = {
  jwt: jwt,
  jsonwebtoken: jsonwebtoken,
};
