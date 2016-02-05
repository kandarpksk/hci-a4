// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log("imagine the (fake) database being spewed here :P") // console.log(data);
	res.render('index', data); // correct?
};