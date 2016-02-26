var data = require('../data.json');

exports.view = function(req, res) { 
	console.log("hi");
	if(req.query.Restaurants == "Panda Express")
		data[panda] = true;
	console.log("req.query.Restaurants: " + req.query.Restaurants);
	res.render('suggest', data);
 }