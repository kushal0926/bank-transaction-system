import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function userRegisterController(req, res) {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(422).json({
      message: "user already exists with this email.",
      status: "failed",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}

export { userRegisterController };
