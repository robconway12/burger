const express = require('express');
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
	burger.all(function(burger_data) {
		console.log(burger_data);
		res.render('index', {burger_data});
	});
});

router.post('/burgers/create', function(req, res) {
	burger.update(req.body.burger_id, function(result) {
		console.log(result);
		// Send back the ID
		res.redirect('/');
	});
});

router.put('/burgers/update', function(req, res) {

	burger.update(req.body.burger_id,
		function(result) {
			console.log(result);
			if (result.changedRows == 0) {
				// If no rows were changed, then the ID must not exist, so 404
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
});

// Export routes for server.js to use.
module.exports = router;
