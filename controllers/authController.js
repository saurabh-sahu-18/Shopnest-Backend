const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = User.create({ name, email, password: hashPassword });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = `
            Welcome to Shopnest, ${name}! Thank You For Registering With Us. Your otp for Shopnest Registration is ${otp}`;

      await sendEmail(email, "Welcome Your OTP For Regisration", message);

      res.status(201).json({
        _id: (await user)._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error in register route", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error in Login Route" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-passsword");
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({message: "Internal Server Error in getUsers AuthController"});
  }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
}