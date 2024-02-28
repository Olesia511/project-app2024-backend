import mongoose from "mongoose";
const { Schema, model } = mongoose;
import Joi from "joi";

const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

//====== mongoose schema   =====

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter a username"],
      minlength: 2,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 5,
    },
    email: {
      type: String,
      match: regexEmail,
      required: [true, "Email is required"],
      unique: true,
    },
    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter",
    // },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false }
);

const User = model("user", userSchema);

//====== Joi schema sign up / sign in   =====

const userSignSchema = Joi.object({
  name: Joi.string().trim().min(2).max(15).required(),
  password: Joi.string().trim().min(5).max(15).required(),
  email: Joi.string().trim().pattern(regexEmail).required(),
});

export default { User, userSignSchema };
