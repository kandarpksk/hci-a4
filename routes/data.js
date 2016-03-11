var data = require('../data.json');

exports.detail = function(req, res){
	var c = data["dishes"].length; // count of restaurants
	for (r=0; r<c; r++) {
		var l = data["dishes"][r]["menu"].length; // number of items
		for (i=0; i<l; i++)
			if(data["dishes"][r]["menu"][i]["name"] == req.params.dish){
				var temp = data["dishes"][r]["menu"][i];
				temp["servings"] = req.params.servings;
				res.json(temp);
			}
	}
};

exports.random = function(req, res){
	for (r=0; r<data["dishes"].length; r++) {
		if (data["dishes"][r]["restaurant"] == req.params.restaurant) {
			var num = data["dishes"][r]["menu"].length;
			var pick = Math.floor(Math.random()*num);
			res.json(data["dishes"][r]["menu"][pick]);
		}
	}
};

exports.list = function(req, res){
	for (r=0; r<data["dishes"].length; r++) {
		if (data["dishes"][r]["restaurant"] == req.params.restaurant) {
			var num = data["dishes"][r]["menu"].length;
			var pick = Math.floor(Math.random()*num);
			var found = data["dishes"][r]["menu"][pick];
			if (req.params.nutrient == 'automatic')
				console.log("todo: automatic nutrient detection");
				// what about excess?
			if (req.params.nutrient == 'lacking-protein')
				while(found.protein < 50/3) {
					pick = Math.floor(Math.random()*num);
					found = data["dishes"][r]["menu"][pick];
					// limit to a certain number of attempts
				}
			else if (req.params.nutrient == 'lacking-fat')
				while(found.fat < 65/3 || found.fat > 65) {
					pick = Math.floor(Math.random()*num);
					found = data["dishes"][r]["menu"][pick];
				}
			else if (req.params.nutrient == 'lacking-calories')
				while(found.fat < 2000/3) {
					pick = Math.floor(Math.random()*num);
					found = data["dishes"][r]["menu"][pick];
				}
			else if (req.params.nutrient == 'lacking-fiber')
				while(found.fat < 25/3) {
					pick = Math.floor(Math.random()*num);
					found = data["dishes"][r]["menu"][pick];
				}
			res.json(found);
		}
	}
};

// set expiry
exports.logout = function(req, res){
	console.log("data.js: logging out from "
			+req.session.user.split(" ")[0]+"'s session now");
	req.session = null;
	delete req.session;
	if(req.session != null)
		console.log("session weirdness: clear cookie manually or use (new) incognito window");
	res.send('Sorry to see you go!');
	// req.session.guest = false;
	// req.session.user = "";
}

exports.remove = function(req, res){
	var i = -1;
	for (i = 0; i < data["users"].length; i++)
		if (data["users"][i]["name"] == req.session.user)
			break;
	console.log("i: "+i);
	var date = req.params.mm+"/"+req.params.dd+"/"+req.params.yyyy;
	for(j = 0; j < data.users[i].days.length; j++)
		if(data.users[i].days[j].date == date) {
			console.log("meal_count: "+data.users[i].days[j].meal_count);
			for(k = 0; k < data.users[i].days[j].meals.length; k++)
				if(data.users[i].days[j].meals[k].time == req.params.time) {
					console.log("k: "+k);
					data.users[i].days[j].meals[k].deleted = true;
					data.users[i].days[j].meal_count = data.users[i].days[j].meal_count-1;
					if(data.users[i].days[j].meal_count == 0)
						data.users[i].actual = data.users[i].actual-1;
					break;
				}
		}
	res.send('dummy');
}
