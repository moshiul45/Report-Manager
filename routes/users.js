const express = require("express");
const { add_user } = require("../controllers/user/user");
const router = express.Router();

const User = require("../models/user/user");
/* GET users listing. */
router.get("/", add_user);

module.exports = router;
