var data = require('../data.json');

exports.view = function(req, res) {
	// add a new meal if at least one food is entered
	if (req.query.food1 != null && req.query.food1 != "") {
		var default_pic = 'http://thumbs.dreamstime.com/m/refresh-ccw-flat-black-color-rounded-vector-icon-symbol-drawn-light-gray-background-57876713.jpg';
		var newMeal = JSON.parse('{'+
			'"food1": "' + req.query.food1 + '",'+
			'"servings1": "' + req.query.servings1 + '", '+
			'"date": "' + req.query.date + '", '+
			'"time": "' + req.query.t + '", '+
			'"pic": "' + default_pic + '" '+
			'}');
		for (i = 0; i < data["users"].length; i++)
			if (data["users"][i]["selected"] != "")
				data["users"][i]["meals"].push(newMeal);
	}

	res.render('history', data);
}