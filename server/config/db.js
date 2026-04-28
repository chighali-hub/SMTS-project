const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('MongoDB connecté (SMTS)');
  } catch (err) {
    console.error('Erreur connexion MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
