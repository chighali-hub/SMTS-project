const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    location: { type: String, default: 'Nouakchott, Mauritanie' },
    email: { type: String, default: 'contact@smtsgroup.com' },
    phone: { type: String, default: '+222 XX XX XX XX' },
    heroImg: {
      type: String,
      default: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=80',
    },
    aboutImg: {
      type: String,
      default: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    },
    investirImg: {
      type: String,
      default: 'https://i1-c.pinimg.com/1200x/71/74/de/7174de9a84626b2b809dff6ae4837624.jpg',
    },
    groupeImg: {
      type: String,
      default: 'https://middle-east-online.com/sites/default/files/styles/home_special_coverage_1920xauto/public/2019-08/weld-gazwani.jpg?itok=-vgDCaDd',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
