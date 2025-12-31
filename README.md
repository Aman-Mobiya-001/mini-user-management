# Mini User Management System
A full-stack user management application with role-based access control (RBAC), authentication, and admin dashboard.

# Project Overview
This is a complete user management system that allows users to register, login, manage their profiles, and provides admin capabilities to manage all users with activate/deactivate functionality.

## Tech Stack

- **Backend**: 
* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB with Mongoose
* Authentication: JWT (JSON Web Tokens)
* Password Hashing: bcrypt
* Validation: Custom middleware
* Security: CORS, helmet, 
* express-validator   

- **Frontend**: 

* Framework: React 18 (with Hooks)
* Build Tool: Vite
* Styling: Tailwind CSS
* Routing: React Router v6
* HTTP Client: Axios
* Notifications: React Hot Toast
* Icons: Font Awesome

- **Deployment**: Render (Backend), Vercel (Frontend), MongoDB Atlas

## Setup Instructions
 **Backend**
1. Navigate to backend directory
cd backend

2. Install dependencies
npm install

3. Create environment file
cp .env.example .env

4. Edit .env with your credentials

 * MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
* JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
* PORT=5000
* FRONTEND_URL=http://localhost:5173

5. Create admin user (optional)
node createAdmin.js

6. Start development server
npm start
OR
node server.js

**Frontend**
1. Navigate to frontend directory
cd frontend

2. Install dependencies
npm install

3. Create environment file
cp .env.example .env

4. Edit .env
VITE_API_BASE_URL=http://localhost:5000/api

5. Start development server
npm run dev

## API Endpoints

1. Authentication Routes(not Auth Required)

* POST /api/auth/signup
* POST /api/auth/login
* POST /api/auth/logout

2. User Routes(Auth Required)
* GET /api/users/me
* PUT /api/users/profile
* PUT /api/users/password

3. Admin Routes(Auth Required)
* GET /api/users 
* PATCH /api/users/:id/status 

# Features

**User Features**

   * User registration with validation
   * User login with JWT authentication
   * View and update profile (name, email)
   * Change password
   * Password visibility toggle
   * Form validation with error messages
   * Protected routes
   * Responsive design (mobile + desktop)

**Admin Features**
   *  View all users with pagination (10 per page)
   * Activate/Deactivate user accounts
   *  Confirmation modal before actions
   * Success/Error notifications
   * Admin-only protected routes

**Security Features**
  *  Password hashing with bcrypt
  *  JWT token authentication
  *  Protected API routes
  *  Role-based access control (RBAC)
  *  Input validation
  *  CORS configuration
  * Environment variables for secrets
  * Deactivated users cannot login

# API Request/Response Examples

**Signup**

*Request:*

* POST /api/auth/signup
* Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Test@123"
}

*Response:*

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1234567890abcdef123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}

**Login**

*Request:*

* POST /api/auth/login
* Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}

*Response:*

{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1234567890abcdef123",
    "fullName": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "status": "active"
  }
}

**Get All Users (Admin)**

* GET /api/users?page=1&limit=10
* Authorization: Bearer <token>

*Response:*

{
  "success": true,
  "users": [
    {
      "_id": "64f8a1234567890abcdef123",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "createdAt": "2025-12-30T10:00:00.000Z"
    }
  ],
  "total": 50,
  "totalPages": 5,
  "currentPage": 1
}

**Update User Status (Admin)**

*Request:*

* PATCH /api/users/64f8a1234567890abcdef123/status
* Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}

*Response:*

{
  "success": true,
  "user": {
    "_id": "64f8a1234567890abcdef123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "inactive"
  }
}

# Deployment

**Deploy Backend to Render**

* Create account on Render

* Create new Web Service

* Connect GitHub repository

*Configure:*

* Build Command: npm install

* Start Command: node server.js

* Environment Variables:* 
   * NODE_ENV=production
   * MONGO_URI=<your_mongodb_atlas_uri>
     JWT_SECRET=<your_secret_key>
   * FRONTEND_URL=https://mini-user-management.vercel.app

**Deploy Frontend to Vercel**

* via Vercel Dashboard:

* Import GitHub repository

* Framework: Vite

* Root Directory: frontend

* Add Environment Variable: VITE_API_BASE_URL

* Deploy

**MongoDB Atlas Setup**

* Create cluster on MongoDB Atlas

* Create database user

* Whitelist IP: 0.0.0.0/0 (allow from anywhere)

* Get connection string

* Add to backend .env




