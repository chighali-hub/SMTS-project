const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    telephone: { type: String, default: '', trim: true },
    sujet: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['contact', 'partenariat'],
      default: 'contact',
    },
    lu: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

module.exports = mongoose.model('Contact', contactSchema, 'contacts');
