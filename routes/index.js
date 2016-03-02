var data = require('../data.json');

exports.view = function(req, res){
	data["alt"] = false;
	res.render('index', data);
};

exports.viewAlt = function(req, res){
	data["alt"] = true;
	res.render('index', data);
};