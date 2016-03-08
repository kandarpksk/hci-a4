var data = require('../data.json');

exports.view = function(req, res){
	data["alt"] = false;

	if(req.query.guest)
		data["guest"] = true;

	// simple authentication system
	// identical usernames go through, but passwords must be different
	//  (relying on chance since this doesn't really matter for the app)
	if(req.query.username != null && req.query.username != "")
		for(i = 0; i < data["users"].length; i++)
			if(data["users"][i]["username"] == req.query.username) {
				if(data["users"][i]["hash"] == req.query.hash)
					{data["users"][i]["selected"] = true; data["guest"] = false;}
			} else data["users"][i]["selected"] = false; // overwrite logins?

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