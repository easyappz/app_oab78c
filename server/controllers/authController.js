const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: newUser._id, email, firstName, lastName } });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, email, firstName: user.firstName, lastName: user.lastName } });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

module.exports = { register, login };
