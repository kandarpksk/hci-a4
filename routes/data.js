var data = require('../data.json');

exports.detail = function(req, res){
	var c = data["dishes"].length; // count of restaurants
	for (r=0; r<c; r++) {
		var l = data["dishes"][r]["menu"].length; // number of items
		for (i=0; i<l; i++)
			if(data["dishes"][r]["menu"][i]["name"] == req.params.dish)
				res.json(data["dishes"][r]["menu"][i]);
	}
};

exports.list = function(req, res){
	for (r=0; r<data["dishes"].length; r++) {
		if (data["dishes"][r]["restaurant"] == req.params.restaurant) {
			// add logic later //
			var num = data["dishes"][r]["menu"].length;
			var pick = Math.floor(Math.random()*num);
			res.json(data["dishes"][r]["menu"][pick]);
		}
	}
};