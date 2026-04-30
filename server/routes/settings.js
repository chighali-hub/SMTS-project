const express = require('express');
const { auth } = require('../middleware/auth');
const Setting = require('../models/Setting');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let setting = await Setting.findOne();
    if (!setting) {
      setting = await Setting.create({});
    }
    res.json(setting);
  } catch (err) {
    next(err);
  }
});

router.put('/', auth, async (req, res, next) => {
  try {
    const { location, email, phone } = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }
    if (location !== undefined) setting.location = location;
    if (email !== undefined) setting.email = email;
    if (phone !== undefined) setting.phone = phone;

    await setting.save();
    res.json(setting);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
