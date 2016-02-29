var data = require('../data.json');

exports.view = function(req, res) {
	// add a new meal if at least one food is entered
	if (req.query.food1 != null && req.query.food1 != "") {
		var newMeal = JSON.parse('{'+
				'"food1": "' + req.query.food1 + '",'	+ /**/ '"servings1": "' + req.query.servings1 + '", '+
				'"date": "' + req.query.date + '", '	+ /**/ '"time": "' + req.query.t + '", '+
				'"pic": "' + '' + '", '					+ /**/ '"snapshots": "' + '' + '" '+
			'}');
		
		for (i = 0; i < data["users"].length; i++)
			if (data["users"][i]["selected"]){
				var count = data["users"][i]["meals"].length;
				if (count > 0) {
					if (JSON.stringify(data["users"][i]["meals"][count-1]) != JSON.stringify(newMeal))
						data["users"][i]["meals"].push(newMeal);
					// try more variety (or try again)...
				}
				else {
					data["users"][i]["meals"].push(newMeal);
					if (data["users"][i]["empty"])
						data["users"][i]["empty"] = false;
				}
				break;
			}
	}

	res.render('history', data);
}