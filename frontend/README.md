# Mini User Management System

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend**: React (Hooks), Bootstrap, React Router
- **Deployment**: Render (Backend), Vercel (Frontend), MongoDB Atlas

## Live Links
- Frontend: https://your-frontend.vercel.app
- Backend API: https://your-backend.onrender.com/api
- Database: MongoDB Atlas

## Setup Instructions
### Backend
cd backend
npm install
cp .env.example .env
npm run dev

### Frontend
cd frontend
npm install
npm start

## Environment Variables
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your-super-secret-key-min-32-chars
PORT=5000

## API Endpoints
POST /api/auth/register
POST /api/auth/login
GET /api/users/me
PUT /api/users/me
PUT /api/users/me/password
GET /api/users (admin)
PATCH /api/users/:id/status (admin)