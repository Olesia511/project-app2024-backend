import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import model from "../models/Users.js";
const { User } = model;

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(`req.body`, req.body);

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
    verificationToken,
  });
  console.log(`newUser`, newUser);

  //   await sendEmail(email, verificationToken);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export default {
  signup: ctrlWrapper(signup),
};
