const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./utils/errorHandler');

// Load env vars
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// TEMPORARY FIX - ALLOW ALL ORIGINS (TESTING ONLY)
app.use(cors({
  origin: true, 
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API Healthy',
    timestamp: new Date().toISOString(),
    corsOrigins: allowedOrigins
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'User Management API',
    endpoints: {
      health: '/api/health',
      login: 'POST /api/auth/login',
      signup: 'POST /api/auth/signup',
      users: 'GET /api/users (admin only)'
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins:`, allowedOrigins);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(60));
});
