require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const mailMiddleware = require("../middleware/mailMiddleware");

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isValidPassword = (password) => /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(password);


const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role = "viewer" } = req.body;
        if (firstName.length < 3) return res.status(400).json({ message: "FirstName should be at least 3 characters long!" });
        if (lastName.length < 3) return res.status(400).json({ message: "LastName should be at least 3 characters long!" });
        if (!isValidEmail(email)) return res.status(400).json({ message: "Invalid email format" });
        if (!isValidPassword(password)) return res.status(400).json({ message: "password should contain atleast 1 lowercase, 1 uppercase, 1 digit, and 1 special character" });

        const existingUser = await user.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();


        // const token = jwt.sign(
        //     { id: newUser._id, email: newUser.email, role: newUser.role },
        //     secretKey,
        //     { expiresIn: "1y" }
        // );
        await mailMiddleware.sendingMail(newUser.email, "Welcome to Adverse", "We adverse team welcome you to our family")
        res.status(201).json({ message: "User registered succesfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }

};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });

        }
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role },
            secretKey,
            { expiresIn: '1y' }
        );
        res.status(200).json({ message: "Login succesfull", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}

module.exports = { registerUser, loginUser };