"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('signs', {
    	id: {
    		allowNull: false,
    		autoIncrement: true,
    		primaryKey: true,
    		type: DataTypes.INTEGER
    	},
        borough: {
            type: DataTypes.STRING
        },
    	sign_sequence: {
    		type: DataTypes.INTEGER
    	},
    	curb_distance: {
    		type: DataTypes.INTEGER
    	},
    	arrow_points: {
    		type: DataTypes.STRING
    	},
    	sign_description: {
    		type: DataTypes.TEXT
    	},
    	sign_code: {
    		type: DataTypes.STRING 
    	},
    	location_id: {
    		type: DataTypes.STRING
    	}

    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('signs').done(done);
  }
};
