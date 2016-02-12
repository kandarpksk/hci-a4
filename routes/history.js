var data = require("../data.json");
var meals = require('../meals.json');
var nutrition = require('../nutrition.json');

exports.view = function(req, res) {
	res.render('history', meals);
}