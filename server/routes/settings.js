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
    const { location, email, phone, phoneDG, phoneDC, heroImg, aboutImg, investirImg, groupeImg, logoImg, logistiqueImg, importExportImg, solutionsImg, poissonsImg } = req.body;
    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting();
    }
    if (location !== undefined) setting.location = location;
    if (email !== undefined) setting.email = email;
    if (phone !== undefined) setting.phone = phone;
    if (phoneDG !== undefined) setting.phoneDG = phoneDG;
    if (phoneDC !== undefined) setting.phoneDC = phoneDC;
    if (heroImg !== undefined) setting.heroImg = heroImg;
    if (aboutImg !== undefined) setting.aboutImg = aboutImg;
    if (investirImg !== undefined) setting.investirImg = investirImg;
    if (groupeImg !== undefined) setting.groupeImg = groupeImg;
    if (logoImg !== undefined) setting.logoImg = logoImg;
    if (logistiqueImg !== undefined) setting.logistiqueImg = logistiqueImg;
    if (importExportImg !== undefined) setting.importExportImg = importExportImg;
    if (solutionsImg !== undefined) setting.solutionsImg = solutionsImg;
    if (poissonsImg !== undefined) setting.poissonsImg = poissonsImg;

    await setting.save();
    res.json(setting);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
