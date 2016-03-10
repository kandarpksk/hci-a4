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
			if (req.params.nutrient != 'random')
				console.log(req.params); //
			var num = data["dishes"][r]["menu"].length;
			var pick = Math.floor(Math.random()*num);
			var found = data["dishes"][r]["menu"][pick];
			var temp = "";
			while(found.protein < 50/3) {
				temp += found.protein+" ";
				pick = Math.floor(Math.random()*num);
				found = data["dishes"][r]["menu"][pick];
				// limit to a certain number of attempts
			}
			console.log(temp+found.protein);
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