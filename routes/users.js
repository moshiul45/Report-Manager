const express = require("express");
const { add_user } = require("../controllers/user/user");
const router = express.Router();

/* GET users listing. */
router.post("/", add_user);

module.exports = router;
