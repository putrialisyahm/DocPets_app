'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({ 
    userId: {
      type: DataTypes.INTEGER,
      require: true,
    },
    nama: {
      type: DataTypes.STRING,
      require: true,
    },
    jenis: {
      type: DataTypes.STRING,
      require: true,
    },
    gender: {
      type: DataTypes.STRING,
      require: true,
    },
   
  }, {
    sequelize,
    paranoid: true, // Activate softdelete
    timestamps: true, // Activate timestamps
    modelName: 'Peliharaan',
  });
  return Peliharaan; 
};