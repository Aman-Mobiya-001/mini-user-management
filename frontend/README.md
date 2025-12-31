# Mini User Management System
A full-stack user management application with role-based access control (RBAC), authentication, and admin dashboard.

# Project Overview
This is a complete user management system that allows users to register, login, manage their profiles, and provides admin capabilities to manage all users with activate/deactivate functionality.

## Tech Stack

- **Backend**: 
Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Tokens)
Password Hashing: bcrypt
Validation: Custom middleware
Security: CORS, helmet, express-validator

- **Frontend**: 

Framework: React 18 (with Hooks)
Build Tool: Vite
Styling: Tailwind CSS
Routing: React Router v6
HTTP Client: Axios
Notifications: React Hot Toast
Icons: Font Awesome

- **Deployment**: Render (Backend), Vercel (Frontend), MongoDB Atlas

## Live Links
- Frontend: https://mini-user-management.vercel.app/
- Backend API: https://mini-user-management.onrender.com/
- Database: MongoDB Atlas

## Setup Instructions
### Backend
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env with your credentials

# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
# JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
# PORT=5000
# FRONTEND_URL=http://localhost:5173

# 5. Create admin user (optional)
node createAdmin.js

# 6. Start development server
npm start
# OR
node server.js

### Frontend
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env
# VITE_API_BASE_URL=http://localhost:5000/api

# 5. Start development server
npm run dev

## API Endpoints

# Authentication Routes(not Auth Required)

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout

# User Routes(Auth Required)
GET /api/users/me
PUT /api/users/profile
PUT /api/users/password

# Admin Routes(Auth Required)
GET /api/users 
PATCH /api/users/:id/status 

# Features

User Features

    User registration with validation
    User login with JWT authentication
    View and update profile (name, email)
    Change password
    Password visibility toggle
    Form validation with error messages
    Protected routes
    Responsive design (mobile + desktop)

Admin Features
    View all users with pagination (10 per page)
    Activate/Deactivate user accounts
    Confirmation modal before actions
    Success/Error notifications
    Admin-only protected routes

Security Features
    Password hashing with bcrypt
    JWT token authentication
    Protected API routes
    Role-based access control (RBAC)
    Input validation
    CORS configuration
    Environment variables for secrets
    Deactivated users cannot login

