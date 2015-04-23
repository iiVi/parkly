"use strict";
module.exports = function(sequelize, DataTypes) {
  var signs = sequelize.define("signs", {
    location_id: DataTypes.TEXT,
    borough: DataTypes.STRING,
    sign_sequence: DataTypes.INTEGER,
    curb_distance: DataTypes.INTEGER,
    arrow_points: DataTypes.STRING,
    sign_description: DataTypes.TEXT,
    sign_code: DataTypes.STRING
  }, {
    timestamps:false,
    underscored:true,

    classMethods: {
 
    }
  });
  return signs;
};