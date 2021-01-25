'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memiliki extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Memiliki.belongsTo(models.User, { foreignKey: 'dokterId' })
      Memiliki.belongsTo(models.Klinik, { foreignKey: 'klinikId' })

    }
  };
  Memiliki.init({
    klinikId: DataTypes.INTEGER,
    dokterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Memiliki',
  });
  return Memiliki;
};