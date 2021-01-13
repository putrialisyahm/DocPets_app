'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Klinik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Klinik.hasMany(models.Memiliki, { as: 'memiliki' })

    }
  };
  Klinik.init({
    nama: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    tentang: DataTypes.STRING,
    fasilitas: DataTypes.STRING,
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Klinik',
  });
  return Klinik;
};