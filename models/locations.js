"use strict";
module.exports = function(sequelize, DataTypes) {
  var locations = sequelize.define("locations", {
    borough: DataTypes.STRING,
    on_street: DataTypes.STRING,
    cross_street_one: DataTypes.STRING,
    cross_one_lat: DataTypes.DECIMAL,
    cross_one_long: DataTypes.DECIMAL,
    cross_street_two: DataTypes.STRING,
    side_of_street: DataTypes.STRING,
  }, {
    timestamps:false,
    underscored:true,

    classMethods: {
      associate: function(models) {
        locations.hasMany(models.signs, { foreignKey: 'location_id' });
      }
    }
  });
  return locations;
};