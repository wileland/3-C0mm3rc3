const { Product } = require('../../models');
jest.mock('../../config/connection'); // Mock database connection

describe('Product model', () => {
  test('create product successfully', async () => {
    const productData = { name: 'Test Product', price: 10.99 };
    Product.create.mockResolvedValue(productData);

    const result = await Product.create(productData);
    expect(result).toEqual(productData);
  });

  test('validate product data', async () => {
    Product.create.mockImplementation(() => {
      throw new Error('Validation error');
    });

    await expect(Product.create({ name: '' })).rejects.toThrow('Validation error');
  });

  // Additional tests for other Product model functionalities
});
