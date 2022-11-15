const User = require("../../models/user/user");
const { schema } = require("../../validator/validator");
const { response } = require("../../utils/response");

//admin can add employee/user for the organization through this controller
exports.add_user = async (req, res) => {
  try {
    const { body: user_body } = req;
    const { name, password, salary, phone, email } = user_body;
    const { error, value } = schema.validate(
      { name, password, salary, phone, email },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return response(res, 200, false, "Validation Error", error.details);
    }
    if (value) {
      const newUser = new User(user_body);
      const user_res = await newUser.save();
      if (user_res) {
        return response(res, 200, true, "New User Added Successfully!");
      }
    }
  } catch (error) {
    return response(
      res,
      400,
      false,
      "Unsuccessful.User not Added! Someting went wrong"
    );
  }
};

//admin can update employee/user for the organization through this controller
exports.update_user = async (req, res) => {
  try {
    const { body: user_body } = req;
    const newUser = new User(user_body);
    const user_res = await newUser.save();
    if (user_res) {
      response(res, 200, true, "New User Added Successfully!");
    }
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error?.message || "Server error!!!",
    });
  }
};
