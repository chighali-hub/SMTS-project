const express = require('express');
const Contact = require('../models/Contact');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { nom, email, telephone, sujet, message, type } = req.body;
    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({
        message: 'Les champs nom, email, sujet et message sont obligatoires',
      });
    }
    const contactType =
      type === 'partenariat' ? 'partenariat' : 'contact';
    const doc = await Contact.create({
      nom,
      email,
      telephone: telephone || '',
      sujet,
      message,
      type: contactType,
    });
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const list = await Contact.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id/lu', auth, async (req, res, next) => {
  try {
    const doc = await Contact.findByIdAndUpdate(
      req.params.id,
      { lu: true },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Contact introuvable' });
    res.json(doc);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
