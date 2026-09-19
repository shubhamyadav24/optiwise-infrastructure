const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const signToken = (admin) =>
  jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required.'
      });
    }

    const admin = await Admin.findOne({
      username: username.trim()
    });

    if (!admin) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    const match = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!match) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      });
    }

    const token = signToken(admin);

    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      message: 'Login failed. Please try again.'
    });
  }
};

// GET /api/auth/me
const me = async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-passwordHash');
  if (!admin) return res.status(404).json({ message: 'Admin not found.' });
  res.json(admin);
};

module.exports = { login, me };
