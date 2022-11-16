const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("../../../configs/env.config");

// Authentication Middleware
const authenticateJWT = async (req, res) => {
  const authHeader = req?.headers?.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const user_res = await User.findOne({ remember_token: token }).select(
      "name email"
    );
    // console.log("====",{user_res});
    if (!user_res) {
      res.status(401).json({
        status: false,
        message: "User is unauthorized!!!",
      });
    } else {
      const { remember_token } = user_res;

      jwt.verify(token, process.env.accessTokenSecret, (err, user) => {
        if (err) {
          return res.status(401).json({
            status: false,
            message: "User is unauthorized!!!",
          });
        }
        req.user = user;
        req.user_details = user_res;
        req.auth = true;
        req.token = token;
        req.remember_token = remember_token;
        req.user_res = user_res;
        console.log({ user: user });
        // console.log("====Token====", token);
      });
    }
  } else {
    res.status(401).json({
      status: false,
      message: "User is unauthorized!!!",
    });
  }
};

exports.authenticateJWT = authenticateJWT;
