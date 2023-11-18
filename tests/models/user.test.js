const { User } = require('../../models');
const sequelize = require('../../config/connection');

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Error syncing sequelize models: ', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Error closing sequelize connection: ', error);
  }
});

describe('User model', () => {
  test('create user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const user = await User.create(userData);
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    // Add more assertions as needed
  });

  test('password hashing', async () => {
    const userData = { username: 'testuser2', email: 'test2@example.com', password: 'password123' };
    const user = await User.create(userData);
    
    // Verify that password hashing is working
    expect(user.password).not.toBe(userData.password);
    expect(user.checkPassword(userData.password)).toBe(true);
  });

  test('validation: required fields', async () => {
    // Create a user with missing required fields
    const userData = { username: 'testuser3' };
    
    // Attempt to create a user with missing required fields
    try {
      await User.create(userData);
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      // Add more specific validation checks here if needed
    }
  });

  // Add more test cases for validation, login, unique email, edge cases, etc.

  // Cleanup
  afterAll(async () => {
    try {
      await sequelize.close();
    } catch (error) {
      console.error('Error closing sequelize connection: ', error);
    }
  });
});
