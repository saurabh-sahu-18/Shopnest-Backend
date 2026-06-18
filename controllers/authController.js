const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({message: "User already exists"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = User.create({name, email, password: hashPassword});
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `
            Welcome to Shopnest, ${name}! Thank You For Registering With Us. Your otp for Shopnest Registration is ${otp}`;

            await sendEmail(email, message);
        }
    } catch (error) {
        console.log("error in register route", err.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}