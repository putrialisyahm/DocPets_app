'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User, { foreignKey: 'userId' })
      // Appointment.hasMany(models.Periksa, { as: 'peliharaan' })
      Appointment.belongsTo(models.User, { foreignKey: 'dokterId' })
      Appointment.belongsTo(models.Klinik, { foreignKey: 'klinikId' })
      Appointment.hasMany(models.Periksa, { as: 'periksa' })

    }
  };
  Appointment.init({
    userId: {
      type: DataTypes.INTEGER,
      require: true,
    },
    dokterId: {
      type: DataTypes.INTEGER,
      require: true,
    },
    klinikId: {
      type: DataTypes.INTEGER,
      require: true,
    },
    peliharaan: {
      type: DataTypes.INTEGER,
      require: true,
    },
    waktu: {
      type: DataTypes.STRING,
      require: true,
    },
    diterima: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue:false
    },
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
    