'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' });
      models.User.hasMany(Reservation);
    }
  }
  Reservation.init({
    dateStart: DataTypes.DATEONLY,
    dateEnd: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};