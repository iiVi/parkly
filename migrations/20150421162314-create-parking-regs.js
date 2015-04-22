"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("parking_regulations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      the_geom: {
      	type: DataTypes.TEXT
      },
      object_id: {
      	type: DataTypes.INTEGER
      },
      borough: {
      	type: DataTypes.STRING
      },
      status_code: {
      	type: DataTypes.TEXT
      },
      sign_sequence: {
      	type: DataTypes.INTEGER
      },
      sign_code: {
      	type: DataTypes.STRING
      },
      curb_distance: {
      	type: DataTypes.INTEGER
      },
      sign_faces: {
      	type: DataTypes.STRING
      },
      sign_arrow: {
      	type: DataTypes.STRING
      },
      x: {
      	type: DataTypes.STRING
      },
      y: {
      	type: DataTypes.STRING
      },
      sign_description: {
      	type: DataTypes.TEXT
      },
      cartodb_id: {
      	type: DataTypes.INTEGER
      }
      
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("parking_regulations").done(done);
  }
};
