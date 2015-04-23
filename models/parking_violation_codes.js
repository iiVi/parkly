"use strict";
module.exports = function(sequelize, DataTypes) {
  var parking_violation_codes = sequelize.define("parking_violation_codes", {
    code: DataTypes.INTEGER,
    definition: DataTypes.TEXT,
    cost: DataTypes.STRING
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return parking_violation_codes;
};