const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');  // ← Points to models/User.js

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      status: 'active'
    });

    console.log('Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: Admin@123');
    console.log('ID:', admin._id);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
