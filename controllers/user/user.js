const User = require("../../models/user/user");
exports.add_user = async (req, res) => {
  try {
    const { body: user_body } = req;
    const newUser = new User(user_body);
    const user_res = await newUser.save();
    if (user_res) {
      return res.status(200).json({
        status: true,
        message: "Test is successful. User data inserted succesfully",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error?.message || "Server error!!!",
    });
  }
};
