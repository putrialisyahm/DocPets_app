'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt"); // Import bcrypt
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Peliharaans, { as: 'peliharaan' })
    }
  };
  User.init({
    nama: {
      type: DataTypes.STRING,
      require: true,
    },
    email: {
      type: DataTypes.STRING,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      require: true,
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    telepon: {
      type: DataTypes.STRING,
      require: true,
    },
    foto: {
      type: DataTypes.STRING,
      defaultValue: "default.png",
      // get() {
      //   const rawValue = this.getDataValue(foto);
      //   return "/img/" + rawValue;
      // },
      require: false,
    },
    role: {
      type: DataTypes.STRING,
      require: true,
    },
    gender: {
      type: DataTypes.STRING,
      require: false,
    },
    waktuKerja: {
      type: DataTypes.STRING,
      require: false,
    },
    pengalaman: {
      type: DataTypes.STRING,
      require: false,
    },
    status: {
      type: DataTypes.STRING,
      require: false,
    },
  }, {
    sequelize,
    paranoid: true, // Activate softdelete
    timestamps: true, // Activate timestamps
    modelName: 'User',
  });
  return User;
};