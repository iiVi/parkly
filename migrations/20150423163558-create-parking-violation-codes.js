"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("parking_violation_codes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      code: {
        type: DataTypes.INTEGER
      },
      definition: {
        type: DataTypes.TEXT
      },
      cost: {
        type: DataTypes.STRING
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("parking_violation_codes").done(done);
  }
};