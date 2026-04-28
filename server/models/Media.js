const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['photo', 'video'],
      required: true,
    },
    url: { type: String, required: true },
    coverUrl: { type: String, default: '' },
    categorie: {
      type: String,
      enum: ['terrain', 'projets', 'evenements'],
      required: true,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Media', mediaSchema, 'medias');
