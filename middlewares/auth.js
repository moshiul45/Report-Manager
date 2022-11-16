const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { response } = require("../utils/response");
require("../../../configs/env.config");

// Authentication Middleware
const authenticateJWT = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user_res = await User.findOne({ remember_token: token }).select(
      "name email role_id remember_token"
    );
    if (!user_res) {
      return response(res, 401, false, "User is unauthorized!");
    } else {
      jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
        if (err) {
          return response(res, 401, false, "User is unauthorized!");
        }
        req.user = user;
        console.log({ user: user });
      });
      next();
    }
  } else {
    return response(res, 401, false, "User is unauthorized!");
  }
};

module.exports = authenticateJWT;
