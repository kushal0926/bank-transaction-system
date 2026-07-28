import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * - user register controller
 * - POST /api/v1/auth/register
 */
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

/**
 * - user login controller
 * - POST /api/v1/auth/login
 */
async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "email or password is invalid.",
      status: "failed",
    });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "email or password is invalid",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
}

export { userRegisterController, userLoginController };
