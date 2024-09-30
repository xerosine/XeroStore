import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all fields!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists!");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please fill all fields!");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      throw new Error("Incorrect Password!");
    }
  } else {
    res.status(404);
    throw new Error("User does not exist!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "sucessfully logged out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const prevUser = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = prevUser.username || user.username;
    user.email = prevUser.email || user.email;

    if (prevUser.password) {
      const hashedPassword = await bcrypt.hash(prevUser.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

//Admin

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user!");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed successfully!" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const prevUser = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = prevUser.username || user.username;
    user.email = prevUser.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  getUser,
  deleteUser,
  updateUser,
};
