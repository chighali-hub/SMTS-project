const mongoose = require('mongoose');

const actualiteSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    contenu: { type: String, required: true },
    image: { type: String, default: '' },
    categorie: {
      type: String,
      enum: ['investissement', 'partenariat', 'marche'],
      required: true,
    },
    publie: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model(
  'Actualite',
  actualiteSchema,
  'actualites'
);
