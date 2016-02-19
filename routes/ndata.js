var data = require('../data.json');

exports.view = function(req, res){
	var l = data["dishes"][0]["menu"].length;
	for (i=0; i<l; i++)
		if(data["dishes"][0]["menu"][i]["name"] == req.params.id)
			res.json(data["dishes"][0]["menu"][i]);
};