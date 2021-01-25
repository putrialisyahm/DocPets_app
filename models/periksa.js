'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periksa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Periksa.belongsTo(models.Peliharaan, { foreignKey: 'peliharaanId' })
      Periksa.belongsTo(models.Appointment, { foreignKey: 'appointmentId' })
    }
  };
  Periksa.init({
    appointmentId: DataTypes.INTEGER,
    peliharaanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Periksa',
  });
  return Periksa;
};