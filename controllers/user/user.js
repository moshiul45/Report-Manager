const User = require("../../models/user/user");
const bcrypt = require("bcrypt");
const { schema } = require("../../validator/validator");
const { response } = require("../../utils/response");

/*****************************************************************
                User LogIn & Log out
*****************************************************************/
exports.login = async (req, res) => {
  try {
    const { email, pass } = req?.body;
    if (!email || !pass) {
      return response(res, 404, false, "Fill up Email & Pass Properly.");
    }
    const user = await User.findOne({ email }).select(
      "-_id name email password phone avatar remember_token status"
    );
    if (!user) {
      return response(res, 404, false, "User not Found");
    }
    const validPassword = await bcrypt.compare(pass, user.password);
    if (!validPassword) {
      return response(res, 404, false, "Incorrect Password");
    }
    if ((user.status = INACTIVE)) {
      return response(res, 403, false, "You are not allowed to login");
    }

    const tokenObject = {
      email: user?.email,
      role_id: user?.role_id,
      name: user?.first_name,
    };
    const accessToken = jwt.sign(tokenObject, accessTokenSecret);

    await User.updateOne({ email }, { remember_token: accessToken });

    return response(res, 200, true, "Logged In", { user, accessToken });
  } catch (error) {
    return response(res, 500, false, error.message);
  }
};

/*****************************************************************
          ADD User, Update User & User Status Change
*****************************************************************/
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user_body.password = hashedPassword;
      const newUser = new User(user_body);
      var user_res = await newUser.save();
      if (user_res) {
        user_res.password = null;
        console.log({ user_res });
        return response(
          res,
          200,
          true,
          "New User Added Successfully!",
          user_res
        );
      }
    }
  } catch (error) {
    return response(
      res,
      400,
      false,
      "Unsuccessful. User not Added! Someting went wrong"
    );
  }
};

exports.update_user = async (req, res) => {
  try {
    const { body: user_body } = req;
    const update_res = User.findByIdAndUpdate({ _id }, { user_body });
    if (update_res) {
      response(res, 200, true, "User Updated Successfully");
    }
  } catch (error) {
    return response(res, 400, false, error.message);
  }
};

exports.change_status = async (req, res) => {
  try {
    const { _id } = req?.body;
    const user_res = await User.findById({ _id });
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
