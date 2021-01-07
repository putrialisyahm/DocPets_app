const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    // email is unique and string type
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    // password must be hashing
    password: {
      type: DataTypes.STRING,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    role: DataTypes.STRING // role is a string
  }, {
    sequelize,
    paranoid: true, // Activate softdelete
    timestamps: true, // Activate timestamps
    modelName: 'user',
  });
  return user;
};
