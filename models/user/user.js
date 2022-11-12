const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 5,
      max: 20,
      default: "",
    },
    email: {
      type: String,
      max: 18,
      length: 18,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      max: 15,
      length: 15,
      default: "",
    },
    password: {
      type: String,
      min: 6,
      max: 14,
      length: 14,
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "inactive",
    },
    remember_token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
