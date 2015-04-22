"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    password_digest: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};