import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const error = new Error('Name, email, and password are required');
      error.statusCode = 400;
      throw error;
    }

    const newUser = await User.create({ name, email, password });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { token, user: newUser }, // toJSON() strips password automatically
    });

  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {  // ← async
  try {
    const { email, password } = req.body;  // ← fixed typo

    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      throw error;
    }

    // Find by email only, select password explicitly (select:false in schema)
    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
      const error = new Error('Invalid credentials');  // vague on purpose
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');  // same message = no user enumeration
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const { password: _pw, ...safeUser } = existingUser.toObject();

    res.status(200).json({  // ← 200 not 201
      success: true,
      message: 'User signed in successfully',
      data: { token, user: safeUser },
    });

  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Signed out successfully' });
};