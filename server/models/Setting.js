const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    location: { type: String, default: 'Nouakchott, Mauritanie' },
    email: { type: String, default: 'contact@smtsgroup.com' },
    phone: { type: String, default: '+222 XX XX XX XX' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
