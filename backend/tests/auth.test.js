const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Auth Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('POST /api/auth/register - success', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test('POST /api/auth/register - email exists', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test User 2',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
  });
});
