const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: '3d',
  });
};

const signUp = async (req, res) => {
  const { fullName, email, password, phoneNumber, gender, date_of_birth, accountType } = req.body;
  try {
    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !gender ||
      !date_of_birth ||
      !accountType
    ) {
      res.status(400).json('All fields requiered');
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      date_of_birth,
      accountType,
    });
    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({ email, token });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.status(200).json({ email, token });
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  login,
};
