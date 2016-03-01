var known = false; // todo: make persistent
function found() { known = true; }
function explain() {
	if(!known){
		window.alert("A serving is how much food a restaurant serves you in a \"regular\" meal.\n\
For liquids, 1 serving = a small drink (2 servings being a medium drink and so on).");
		known = true;
	} // change to confirm?
}