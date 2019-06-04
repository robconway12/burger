// Import the ORM to create functions that will interact with the database.
const orm = require('../config/orm.js');

const burger = {
	all: function(cb) {
		orm.all('burgers', function(res) {
			cb(res);
		});
	},
	// The variables are arrays.
	create: function(name, cb) {
		orm.create('burgers', name, cb);
	},

	update: function(id, cb) {
		orm.update('burgers', id, cb);
	}
};

// Export the database functions for the controller (burgersController.js).
module.exports = burger;
