"use strict";
module.exports = function(sequelize, DataTypes) {
  var locations = sequelize.define("locations", {
    borough: DataTypes.STRING,
    on_street: DataTypes.STRING,
    cross_street_one: DataTypes.STRING,
    cross_street_two: DataTypes.STRING,
    side_of_street: DataTypes.STRING,
  }, {
    timestamps:false,
    underscored:true,

    classMethods: {
      associate: function(models) {
        locations.hasMany(models.parking_regulations, { foreignKey: 'location_id' });
      }
    }
  });
  return locations;
};