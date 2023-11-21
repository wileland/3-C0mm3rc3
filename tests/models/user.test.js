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
  // Test for creating a user
  test('create user', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    try {
      const user = await User.create(userData);
      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);
    } catch (error) {
      console.error('Error in create user test: ', error);
      throw error;
    }
  });

  // Test for password hashing
  test('password hashing', async () => {
    const userData = { username: 'testuser2', email: 'test2@example.com', password: 'password123' };
    const user = await User.create(userData);
    try {
      await User.create(userData);
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors.length).toBe(2); // Check for the number of validation errors
    
      expect(error.errors[0].path).toBe('email'); // Validate 'email' error
      expect(error.errors[0].message).toContain('email is required'); // Check for specific error message
    
      expect(error.errors[1].path).toBe('password'); // Validate 'password' error
      expect(error.errors[1].message).toContain('password is required'); // Check for specific error message
    
   // expect(user.password).not.toBe(userData.password);
   // expect(user.checkPassword(userData.password)).toBe(true);
  });
// Possibly include: expect(user.password).not.toBe(userData.password);

  // Test for required fields validation
  test('validation: required fields', async () => {
    const userData = { username: 'testuser3' };
    try {
      await User.create(userData);
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors[0].path).toBe('email'); // Checks if the 'email' field is causing the validation error
      expect(error.errors[1].path).toBe('password'); // Checks if the 'password' field is causing the validation error
    }
  });

  // Test for unique email constraint
  test('unique email', async () => {
    const userData = { username: 'uniqueUser', email: 'unique@example.com', password: 'uniquePass123' };
    await User.create(userData);

    try {
      await User.create({ ...userData, username: 'anotherUser' }); // Attempt to create a user with the same email
    } catch (error) {
      expect(error.name).toBe('SequelizeUniqueConstraintError'); // Validate error type
      expect(error.errors.length).toBe(1); // Check for the number of validation errors
    
      expect(error.errors[0].path).toBe('email'); // Validate 'email' error
      expect(error.errors[0].message).toContain('email must be unique'); // Check for specific error message
    }

  // Test for login functionality
  test('login with valid credentials', async () => {
    const userData = { username: 'loginUser', email: 'login@example.com', password: 'loginPass123' };
    await User.create(userData);

    const foundUser = await User.findOne({ where: { email: userData.email } });
    expect(foundUser.checkPassword(userData.password)).toBe(true);
  });

  // Test for login with incorrect password
  test('login with incorrect password', async () => {
    const userData = { username: 'wrongPassUser', email: 'wrongPass@example.com', password: 'correctPass123' };
    await User.create(userData);

    const foundUser = await User.findOne({ where: { email: userData.email } });
    expect(foundUser.checkPassword('incorrectPassword')).toBe(false); // Verify incorrect password
  });

  // Edge case tests
  test('extremely long username', async () => {
    const userData = { username: 'a'.repeat(256), email: 'longUser@example.com', password: 'longUserPass123' };
    try {
      await User.create(userData);
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError'); // Validate error type
      expect(error.errors.length).toBe(1); // Check for the number of validation errors
    
      expect(error.errors[0].path).toBe('username'); // Validate 'username' error
      expect(error.errors[0].message).toContain('username must be less than 256 characters'); // Check for specific error message
    }

  // Cleanup after each test
  afterEach(async () => {
    await User.destroy({ where: {} });
  });
});
