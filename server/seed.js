require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<USERNAME>')) {
    console.error(
      'Configurez MONGODB_URI dans server/.env avant d’exécuter le seed.'
    );
    process.exit(1);
  }
  await mongoose.connect(uri);
  const existing = await Admin.findOne({ username: 'admin' });
  if (existing) {
    console.log('Compte admin existe déjà (username: admin).');
    await mongoose.disconnect();
    process.exit(0);
  }
  const hash = await bcrypt.hash('admin123', 10);
  await Admin.create({
    username: 'admin',
    password: hash,
    email: 'admin@smtsgroup.com',
  });
  console.log('Admin créé : username=admin, password=admin123');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
