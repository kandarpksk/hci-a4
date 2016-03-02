var known = false; // todo: make persistent
function found() { known = true; }

var line1 = 'A serving is how much food a restaurant serves you in a "regular" meal.';
var line2 = '\nFor liquids, 1 serving = a small drink (2 servings being a medium drink and so on).';
function explain() {
	if(!known){
		window.alert(line1+line2+line3);
		known = true;
	} // change to confirm?
}