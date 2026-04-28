const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Identifiant et mot de passe requis' });
    }
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    const token = jwt.sign(
      { id: admin._id.toString(), username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
