const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// User model to manage user data
class User extends Model {
  // Method to check password validity
  checkPassword = (loginPw) => bcrypt.compareSync(loginPw, this.password);
}

User.init({
  // User ID
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // Username
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Email address
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  // Password
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8] } // Ensuring password length is at least 8 characters
  }
}, {
  hooks: {
    // Before creating a new user
    beforeCreate: async (userData) => {
      try {
        userData.password = await bcrypt.hash(userData.password, 10); // Hashing password
        return userData;
      } catch (err) {
        console.error('Error hashing password: ', err); // Error handling
        throw new Error('Error hashing password');
      }
    },
    // Before updating a user's data
    beforeUpdate: async (userData) => {
      try {
        if (userData.changed('password')) {
          userData.password = await bcrypt.hash(userData.password, 10); // Hashing new password
        }
        return userData;
      } catch (err) {
        console.error('Error hashing updated password: ', err); // Error handling
        throw new Error('Error hashing updated password');
      }
    }
  },
  sequelize,
  timestamps: true, // Enable timestamps for record keeping
  modelName: 'user',
});

module.exports = User;
