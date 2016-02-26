// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page initialized (now in public/js/history.js)");


	var x = document.getElementById("myHeader");

	// compose the HTML
	var new_html =
		'SDLFSJEWLFIJSDLFKSJDLFKJ';

	// get the DIV to add content to
	var nutrition_div = $("{{date}}-{{time}}-{{food1}}");
	// add the content to the DIV
	nutrition_div.html(new_html);
}