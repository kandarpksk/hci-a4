
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 * Fetches nutrient info, tallies them up, and displays them in the [?]
 */
function initializePage() {
	//each meal
	$(".nutrition-info").each( function () {
		//used later in the callback function (same scope)
		var this_meal_div = $(this);

		//get the date of this meal inherent in its id
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
			var reqs = [2000, 65, 50, 25];

			//get the nutrient counts already on the page for the corr. meal
			var calories = Number(this_meal_div.children("div.calories").text());
			var total_fat = Number(this_meal_div.children("div.total_fat").text());
			var protein = Number(this_meal_div.children("div.protein").text());
			var fiber = Number(this_meal_div.children("div.fiber").text());

			//tally up nutrients
			var q = Number(result["servings"]);
			calories += Number(result["calories"]) * q;
			total_fat += Number(result["total_fat"]) * q;
			protein += Number(result["protein"]) * q;
			fiber += Number(result["dietary_fiber"]) * q;

			//display nutrients
			this_meal_div.children("div.calories").text(parseInt((calories*100)/reqs[0]));
			this_meal_div.children("div.total_fat").text(parseInt((total_fat*100)/reqs[1]));
			this_meal_div.children("div.protein").text(parseInt((protein*100)/reqs[2]));
			this_meal_div.children("div.fiber").text(parseInt((fiber*100)/reqs[3]));
		}
	});
}
