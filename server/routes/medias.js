const express = require('express');
const Media = require('../models/Media');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const safeExt = ext || (file.mimetype.startsWith('image/') ? '.jpg' : '.mp4');
    const name = `${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 250 * 1024 * 1024 }, // 250MB
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/');
    cb(ok ? null : new Error('Type de fichier non autorisé'), ok);
  },
});

router.get('/', async (req, res, next) => {
  try {
    const list = await Media.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/',
  auth,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  async (req, res, next) => {
  try {
    const { titre, type, url, categorie } = req.body;
    const file = req.files?.file?.[0] || null;
    const cover = req.files?.cover?.[0] || null;

    const resolvedUrl = file ? `/uploads/${file.filename}` : url;
    const coverUrl = cover ? `/uploads/${cover.filename}` : '';

    if (!titre || !type || !resolvedUrl || !categorie) {
      return res.status(400).json({
        message:
          'titre, type, categorie et (fichier ou url) sont obligatoires',
      });
    }
    const doc = await Media.create({
      titre,
      type,
      url: resolvedUrl,
      coverUrl,
      categorie,
    });
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const doc = await Media.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Média introuvable' });

    const toLocalPath = (u) =>
      typeof u === 'string' && u.startsWith('/uploads/')
        ? path.join(uploadsDir, u.replace('/uploads/', ''))
        : null;

    const filePath = toLocalPath(doc.url);
    const coverPath = toLocalPath(doc.coverUrl);
    [filePath, coverPath].filter(Boolean).forEach((p) => {
      fs.unlink(p, () => {});
    });

    res.json({ message: 'Supprimé' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
