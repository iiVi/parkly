"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("street_codes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      street_code: {
        type: DataTypes.INTEGER
      },
      street_name: {
        type: DataTypes.STRING
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("street_codes").done(done);
  }
};