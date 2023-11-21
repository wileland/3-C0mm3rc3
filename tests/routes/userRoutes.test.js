const request = require('supertest');
const app = require('../../server'); // Adjust the path to your Express app
const { User } = require('../../models');
const sequelize = require('../../config/connection');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User routes', () => {
  test('register user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('testuser');
    // Add more assertions as needed
  });

  test('login user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await User.create(userData);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Check if token is present
    expect(res.body.user.id).toBeTruthy(); // Check if user ID is returned
  });

  test('validate user input', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: '', email: 'invalid-email', password: 'short' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Invalid email or password'); // Specific error message
  });

  test('unique email constraint', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await User.create(userData);

    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'anotheruser', email: 'test@example.com', password: 'password456' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('email must be unique'); // Specific error message
  });

  test('edge cases', async () => {
    // Test for empty username
    const res1 = await request(app)
      .post('/api/users/register')
      .send({ username: '', email: 'test@example.com', password: 'password123' });
    expect(res1.statusCode).toBe(400);
    expect(res1.body.message).toContain('Invalid email or password'); // Specific error message

    // Test for extremely long username
    const res2 = await request(app)
      .post('/api/users/register')
      .send({ username: 'a'.repeat(256), email: 'test@example.com', password: 'password123' });
    expect(res2.statusCode).toBe(400);
    expect(res2.body.message).toContain('username must be less than 256 characters'); // Specific error message
  });

  // Cleanup after tests
  afterEach(async () => {
    await User.destroy({ where: {} });
  });
});
