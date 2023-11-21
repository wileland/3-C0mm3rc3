const UserService = require('../../services/UserService');
const { User } = require('../../models');

jest.mock('../../models'); // Mock the User model

describe('UserService', () => {
  beforeEach(() => {
    User.mockClear();
  });

  test('create user successfully', async () => {
    const userData = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    User.create.mockResolvedValue(userData);
    
    const result = await UserService.createUser(userData);
    expect(result).toEqual(userData);
  });

  test('handle user creation failure', async () => {
    User.create.mockRejectedValue(new Error('Creation failed'));
    await expect(UserService.createUser({})).rejects.toThrow('Creation failed');
  });

  // Add more tests for other UserService methods
});
