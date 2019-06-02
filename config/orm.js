const connection = require('../config/connection.js');

function printQuestionMarks(num) {
	const arr = [];

	for (const i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
	const arr = [];

	for (const key in ob) {
		if (Object.hasOwnProperty.call(ob, key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
	all: function(tableInput, cb) {
		const queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	create: function(table, cols, vals, cb) {
		const queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		console.log(queryString);

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	update: function(tableInput, condition, cb) {
		const queryString = 'UPDATE ' + tableInput + 'SET devoured=true WHERE id=' + condition + ';';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			cb(result);
		});
	},
};

// Export the orm object for the model (cat.js).
module.exports = orm;
