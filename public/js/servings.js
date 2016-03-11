function found() { known = true; }

var line1 = 'A serving is how much food a restaurant serves you in a *regular* meal.';
var line2 = '\nFor liquids, 1 serving = a small drink (2 servings being a medium drink and so on).';
var l3 = "\nIf you wish to be reminded of this, press Okay. Otherwise, press Cancel.";
function explain() {
	if(!known){
		if(!window.confirm(line1+line2+l3))
			$.get("/data/noreminder");
		known = true;
	} // change to confirm?
}
// sessions, bars
// restart Heroku, tweaks only