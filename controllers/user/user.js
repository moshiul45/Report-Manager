const User = require("../../models/user/user");
const { successResponse } = require("../../utils/response");
//admin can add employee/user for the organization through this controller
exports.add_user = async (req, res) => {
  try {
    const { body: user_body } = req;
    const newUser = new User(user_body);
    const user_res = await newUser.save();
    if (user_res) {
      successResponse(res, 200, true, "New User Added Successfully!");
    }
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error?.message || "Server error!!!",
    });
  }
};
