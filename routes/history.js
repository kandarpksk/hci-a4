var meals = require('../meals.json');
var nutrition = require('../nutrition.json'); // still unused

exports.view = function(req, res) {
	res.render('history', meals);
}