// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 * Fetches nutrient info, tallies them up, and displays them in the 
 */
function initializePage() {
	//each meal
	$(".nutrition-info").each( function (){
		//Used later in the callback function (same scope)
		var this_meal_div = $(this);

		//Get the date of this meal inherent in its id
		var date = $(this).closest('td').attr('id');

		//for each food (e.g. food1)...
		$(this).children('div.foods').children('div').each(function () {
    		var f = $(this).attr('class'); // "this" is the current element in the loop
    		var s = $(this).children('div').attr('class');
    		//console.log(s + " serving(s) of " + f);
    		$.get("/data/nutrition/"+f+"/"+s, showInfo);
    	});

		/*
		 * Function to show nutrition info ( called from $.get() )
		 */
		function showInfo(result) {
			//Get the nutrient counts already on the page for the corr. meal
			var calories = parseInt(this_meal_div.children("div.calories").text());
			var total_fat = parseInt(this_meal_div.children("div.total_fat").text());
			var protein = parseInt(this_meal_div.children("div.protein").text());

			//tally up nutrients
			calories += parseInt(result["calories"]) * parseInt(result["servings"]);
			total_fat += parseInt(result["total_fat"]) * parseInt(result["servings"]);
			protein += parseInt(result["protein"]) * parseInt(result["servings"]);

			//display nutrients
			this_meal_div.children("div.calories").text(calories);
			this_meal_div.children("div.total_fat").text(total_fat);
			this_meal_div.children("div.protein").text(protein);
		}

	});
}



