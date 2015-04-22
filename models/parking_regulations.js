"use strict";
module.exports = function(sequelize, DataTypes) {
  var parking_regulations = sequelize.define("parking_regulations", {
    the_geom: DataTypes.TEXT,
    object_id: DataTypes.INTEGER,
    borough: DataTypes.STRING,
    status_code: DataTypes.TEXT,
    sign_sequence: DataTypes.INTEGER,
    sign_code: DataTypes.STRING,
    curb_distance: DataTypes.INTEGER,
    sign_faces: DataTypes.STRING,
    sign_arrow: DataTypes.STRING,
    x: DataTypes.STRING,
    y: DataTypes.STRING,
    sign_description: DataTypes.TEXT,
    cartodb_id: DataTypes.INTEGER
  }, {
    timestamps:false,
    underscored:true,

    classMethods: {
      
    }
  });
  return parking_regulations;
};