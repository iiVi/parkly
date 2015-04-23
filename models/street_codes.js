"use strict";
module.exports = function(sequelize, DataTypes) {
  var street_codes = sequelize.define("street_codes", {
    street_code: DataTypes.INTEGER,
    street_name: DataTypes.STRING
  }, {
    underscored:true,
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return street_codes;
};