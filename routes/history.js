var data = require('../data.json');

exports.view = function(req, res) {
	var user_data = JSON.parse(JSON.stringify(data));
	delete user_data.users; // deep copy, so not an issue
	user_data.guest = req.session.guest;

	var goto_welcome = true;
	if(req.session.user != "" && req.session.user != null)
		goto_welcome = false;
	else if(req.session.guest) // explicitly browse as guest
		goto_welcome = false;
	if(goto_welcome){
		res.render('welcome');
		return;
	}

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
		
		var image = req.query.img;
		if(image == undefined) image = "";
		var newMeal = JSON.parse(
				'{ "food1": "' + req.query.food1 + '",'
				+ '"servings1": "' + req.query.servings1 + '", '
				+ more // all other (non-empty) food inputs
				+ '"time": "' + req.query.t + '", '
				+ '"pic": "' + image + '" }');
		
		var snapshots = 'false';
		if(image != "") snapshots = 'true';

		var newDay = JSON.parse('{ "date": "' + req.query.date + '", '
				+ '"snapshots": "' + snapshots + '", "meals": [], "meal_count": 1 }');
		newDay["meals"].push(newMeal);

		if (req.session.user != "" && req.session.user != null){ // 'req' and null check
			var i = -1; // check initialization
			for (i = 0; i < data["users"].length; i++)
				if (data["users"][i]["name"] == req.session.user)
					break;
			var count = data["users"][i]["days"].length;
			if (count > 0) {
				var exists = false;
				for (j = 0; j < count; j++)
					if (data["users"][i]["days"][j]["date"] == newDay["date"]) {
						// checking if that meal already exists
						var ignore = false;
						for (k=0; k<data["users"][i]["days"][j]["meals"].length; k++)
							if(data["users"][i]["days"][j]["meals"][k]["time"] == req.query.t
									&& !data["users"][i]["days"][j]["meals"][k]["deleted"]) {
								user_data.err = "There's already a meal logged for that time, try removing it first.";
								ignore = true;
								break;
							}

						if(!ignore) {
							if(data["users"][i]["days"][j]["meal_count"] == 0)
								data.users[i].actual += 1;
							data["users"][i]["days"][j]["meals"].push(newMeal);
							data["users"][i]["days"][j]["meal_count"] += 1;
							if (!data["users"][i]["days"][j]["snapshots"])
								data["users"][i]["days"][j]["snapshots"] = newDay["snapshots"];
						}
						exists = true;
					}

				if (!exists) { // what about "sorting"
					data["users"][i]["days"].push(newDay);
					data.users[i].actual += 1;
				}

				// try more variety (or try again)...
			} else {
				data["users"][i]["days"].push(newDay);
				data.users[i].actual += 1;
			}
		}
	}

	if(req.session.user != "" && req.session.user != null) {
		user_data["name"] = req.session.user;
		for (i = 0; i < data["users"].length; i++)
			if (data["users"][i]["name"] == req.session.user) {
				user_data["days"] = JSON.parse(JSON.stringify(data["users"][i]["days"]));
				user_data.actual = data.users[i].actual;
			}
	}

	// console.log(user_data);
	user_data["page_history"] = true;
	res.render('history', user_data);
}