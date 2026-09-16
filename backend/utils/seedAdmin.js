// Run once with: npm run seed:admin
// Creates the first admin account from ADMIN_USERNAME / ADMIN_PASSWORD in .env
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const mongoose = require('mongoose');

(async () => {
  await connectDB();

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'change_this_password';

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists. Nothing to do.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ username, passwordHash, name: 'Optiwise Admin' });
  console.log(`Admin account created. Username: ${username}`);
  console.log('Log in at /admin/login with the password set in your .env file.');
  mongoose.connection.close();
  process.exit(0);
})();
