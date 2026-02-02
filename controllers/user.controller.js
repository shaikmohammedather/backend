import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
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
  
}

export { registerUser };
