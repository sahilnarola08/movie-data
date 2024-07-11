const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

router.post('/create', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'User email already exists. Please use another email.', code:409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword
    });
    await user.save();
    res.status(200).json({code:200, message: 'User register successfully.'});
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating User', code:400 });
  }
});

router.get('/get', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json({code:200, users});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users', code:500 });
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).exec();
    if (!user) {
      res.status(404).json({ message: 'User not found', code: 404 });
    } else {
      res.json({ 
        code: 200, 
        user: {
          _id: user._id,
          username: user.username,
          email: user.email
        }
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user', code: 500 });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!user) {
      res.status(404).json({ message: 'User not found', code:404 });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user', code:500 });
  }
});

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found', code: 404 });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password', code: 401 });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', code: 200, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in', code: 500 });
  }
});

module.exports = router;