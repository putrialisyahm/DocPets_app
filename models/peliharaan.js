'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peliharaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peliharaan.belongsTo(models.User, { foreignKey: 'userId' })
      // Peliharaan.hasMany(models.Appointment, { as: 'appointment' })
    
    }
  };
  Peliharaan.init({
    userId: {
      type: DataTypes.STRING,
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
    modelName: 'Peliharaan',
  });
  return Peliharaan;
};