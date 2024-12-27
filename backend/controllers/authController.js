const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Validate user input
const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

// Register a new user
exports.register = async (req, res) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    try {
      const { name, email, password, role } = req.body;
  
      // Allow only admin to set roles explicitly
      if (role && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can assign roles.' });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Email already exists' });
  
      const user = new User({ name, email, password, role });
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

// Login user
exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
