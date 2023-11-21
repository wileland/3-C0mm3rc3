const { ErrorHandler } = require('../../utils/ErrorHandler');
const { app } = require('../../server'); // Your Express app
const request = require('supertest');

describe('Error Handling', () => {
  test('handle 404 error', async () => {
    const response = await request(app).get('/nonexistent-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toContain('Not Found');
  });

  // Additional tests for different error scenarios
});
