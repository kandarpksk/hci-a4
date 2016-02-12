// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
})

$(function() {
	var availableTags=["Hamburger", "Tofu", "Pocky", "Milano"];
	$("#tags").autocomplete({source: availableTags});
});