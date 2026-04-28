const express = require('express');
const Actualite = require('../models/Actualite');
const { auth, tryAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext || '.jpg';
    const name = `${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB image
  fileFilter: (req, file, cb) => {
    const ok = file.mimetype.startsWith('image/');
    cb(ok ? null : new Error('Image non autorisée'), ok);
  },
});

const toLocalPath = (u) =>
  typeof u === 'string' && u.startsWith('/uploads/')
    ? path.join(uploadsDir, u.replace('/uploads/', ''))
    : null;

const parseBool = (v) => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (s === 'true' || s === '1' || s === 'yes') return true;
    if (s === 'false' || s === '0' || s === 'no' || s === '') return false;
  }
  return false;
};

router.get('/', tryAuth, async (req, res, next) => {
  try {
    const filter = req.admin ? {} : { publie: true };
    const list = await Actualite.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', tryAuth, async (req, res, next) => {
  try {
    const doc = await Actualite.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Actualité introuvable' });
    if (!doc.publie && !req.admin) {
      return res.status(404).json({ message: 'Actualité introuvable' });
    }
    res.json(doc);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, upload.single('imageFile'), async (req, res, next) => {
  try {
    const { titre, contenu, image, categorie, publie } = req.body;
    const file = req.file || null;
    const resolvedImage = file ? `/uploads/${file.filename}` : image || '';
    if (!titre || !contenu || !categorie) {
      return res.status(400).json({
        message: 'titre, contenu et categorie sont obligatoires',
      });
    }
    const doc = await Actualite.create({
      titre,
      contenu,
      image: resolvedImage,
      categorie,
      publie: parseBool(publie),
    });
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', auth, upload.single('imageFile'), async (req, res, next) => {
  try {
    const { titre, contenu, image, categorie, publie } = req.body;
    const existing = await Actualite.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ message: 'Actualité introuvable' });

    const file = req.file || null;
    const resolvedImage =
      file ? `/uploads/${file.filename}` : image !== undefined ? image : undefined;

    const update = {
      ...(titre !== undefined && { titre }),
      ...(contenu !== undefined && { contenu }),
      ...(resolvedImage !== undefined && { image: resolvedImage }),
      ...(categorie !== undefined && { categorie }),
      ...(publie !== undefined && { publie: parseBool(publie) }),
    };

    const doc = await Actualite.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ message: 'Actualité introuvable' });

    if (file) {
      const oldPath = toLocalPath(existing.image);
      if (oldPath) fs.unlink(oldPath, () => {});
    }

    res.json(doc);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const doc = await Actualite.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Actualité introuvable' });
    const oldPath = toLocalPath(doc.image);
    if (oldPath) fs.unlink(oldPath, () => {});
    res.json({ message: 'Supprimé' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
