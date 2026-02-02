import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all need to be filled ",
      });
    }
    const existingUSer = await user.findOne({ email });
    if (existingUSer) {
      return res.status(400).json({
        message: "user already exsisted",
      });
    }
    const salt = await bcrypt.gensalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "user registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
  // log in
  async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "email and password required" });
      }
      const existingUser = await user.findOne({ email });
      if (!existingUser) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const token = generateToken(existingUser);
      return res.status(200).json({
        message: "login successful",
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "server error" });
    }
  }
}

export { registerUser, loginUser };
