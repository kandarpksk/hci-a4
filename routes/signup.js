var data = require('../data.json');

exports.view = function(req, res) { 
	var user_data = JSON.parse(JSON.stringify(data));
	delete user_data.users;

	req.session.user = "User Surname";
	req.session.guest = false;

	// params
	req.session.name = req.query.name;
	user_data["name"] = req.session.name;
	for (i = 0; i < data["users"].length; i++)
		if (data["users"][i]["name"] == req.session.user) {
			user_data["days"] = JSON.parse(JSON.stringify(data["users"][i]["days"]));
			user_data.actual = data.users[i].actual;
		}

	user_data["screenshot"] = true;

	user_data["page_home"] = true;
	res.render('index', user_data);
 }