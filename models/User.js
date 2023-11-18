const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword = (loginPw) => bcrypt.compareSync(loginPw, this.password);
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8] }
  }
}, {
  hooks: {
    beforeCreate: async userData => {
      userData.password = await bcrypt.hash(userData.password, 10);
      return userData;
    },
    beforeUpdate: async userData => {
      if (userData.changed('password')) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      return userData;
    }
  },
  sequelize,
  timestamps: true,
  modelName: 'user',
});

module.exports = User;
