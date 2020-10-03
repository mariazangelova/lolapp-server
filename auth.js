const jwt = require("jsonwebtoken");

const { jwtSecret } = require("./auth.config");

function toJWT(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = { toJWT, toData };
