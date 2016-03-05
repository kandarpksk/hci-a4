var data = require('../data.json');

exports.view = function(req, res){
	data["alt"] = false;

	//check data req.
	
	var goto_welcome = true;
	for(i = 0; i < data["users"].length; i++)
		if(data["users"][i]["selected"])
			goto_welcome = false;
	if(data["guest"]) // explicitly browse as guest
		goto_welcome = false;
	if(goto_welcome){
		res.render('welcome');
		return;
	}

	//redirecting to... page

	res.render('index', data);
};

//deprecate
exports.viewAlt = function(req, res){
	data["alt"] = true;
	res.render('index', data);
};