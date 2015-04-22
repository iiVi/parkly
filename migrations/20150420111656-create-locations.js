"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('locations', {
	    id: {
	        allowNull: false,
	        //primaryKey: true,
	        type: DataTypes.STRING
	      },
	     borough: {
	     	type: DataTypes.STRING
	     },
	     on_street: {
	     	type: DataTypes.STRING
	     },
	     cross_street_one: {
	     	type: DataTypes.STRING
	     },
	     cross_street_two: {
	     	type: DataTypes.STRING
	     },
	     side_of_street: {
	     	type: DataTypes.STRING
	     }
  		
  	}).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('locaitons').done(done);
  }
};
