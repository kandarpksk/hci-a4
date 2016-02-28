var data = require('../data.json');

exports.view = function(req, res) { 
	// data[panda] = true;
	res.render('suggest', data);
 }