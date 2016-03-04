var data = require('../data.json');

exports.view = function(req, res) {
	// add a new meal if at least one food is entered
	if (req.query.food1 != null && req.query.food1 != "") {
		var more = "";
		if(req.query.food2 != null && req.query.food2 != "")
			more += '"food2": "' + req.query.food2 + '",'
				+ '"servings2": "' + req.query.servings2 + '", ';
		if(req.query.food3 != null && req.query.food3 != "")
			more += '"food3": "' + req.query.food3 + '",'
				+ '"servings3": "' + req.query.servings3 + '", ';
		if(req.query.food4 != null && req.query.food4 != "")
			more += '"food4": "' + req.query.food4 + '",'
				+ '"servings4": "' + req.query.servings4 + '", ';
		
		var newMeal = JSON.parse(
				'{ "food1": "' + req.query.food1 + '",'
				+ '"servings1": "' + req.query.servings1 + '", '
				+ more // all other (non-empty) food inputs
				+ '"time": "' + req.query.t + '", '
				+ '"pic": "' + req.query.img + '" }');
		
		var snapshots = 'false';
		if(req.query.img != "")
			snapshots = 'true';

		var newDay = JSON.parse('{ "date": "' + req.query.date + '", '
				+ '"snapshots": "' + snapshots + '", "meals": [] }');
		newDay["meals"].push(newMeal);

		for (i = 0; i < data["users"].length; i++)
			if (data["users"][i]["selected"]){
				var count = data["users"][i]["days"].length;
				if (count > 0) {
					var exists = false;
					for (j = 0; j < count; j++)
						if (data["users"][i]["days"][j]["date"] == newDay["date"]) {
							// not checking if that meal already exists
							data["users"][i]["days"][j]["meals"].push(newMeal);
							if (!data["users"][i]["days"][j]["snapshots"])
								data["users"][i]["days"][j]["snapshots"] = newDay["snapshots"];
							exists = true;
						}
					if (!exists) // what about "sorting"
						data["users"][i]["days"].push(newDay);

					// try more variety (or try again)...
				} else {
					data["users"][i]["days"].push(newDay);
					if (data["users"][i]["empty"])
						data["users"][i]["empty"] = false;
				}
				break;
			}
	}

	res.render('history', data);
}