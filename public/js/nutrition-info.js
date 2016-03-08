
var meal_total = [0, 0, 0, 0];
var s = 0;

function info(where) {
	// console.log("called for nutritional information from: "+where)

	meal_total = [0, 0, 0, 0];
	var temp = "info. of "; // console.log("reset done")
	$(".add-meal-button").attr("data-target","");
	for(i=1; i<=4; i++) {
		if (document.forms["addMealForm"]["food"+i] != null) {
			var f = document.forms["addMealForm"]["food"+i].value;
			servings = document.forms["addMealForm"]["servings"+i].value;
			if (servings == "" || servings == null) s = 0;
			else s = Number(servings);
			if(f!="" && f!=null) {
				// might need something called closures
				$.get("/data/nutrition/"+f+"/"+s, show);
				// temp += f+", ";
			}
			else break; // might work
		} else break;
	}
	// console.log(temp);

	// when there is no food input yet...
}

var reset_flag = false;
function reset() {
	meal_total = [0, 0, 0, 0];
	reset_flag = true;
	var dummy = "dummy";
	show(dummy);
}

function show(result) {
	var reqs = [2000, 65, 50, 25];

	$("#stat").fadeIn();
	$(".add-meal-button").fadeIn();

	// scrolling to find error msg. is not nice
	if (result != "dummy") {
		// console.log("show() called for: (below)");
		// console.log(result);
	}

	if(reset_flag)
		reset_flag = false
	else {
		var q = Number(result["servings"]); if (q == 0) q=1;
		meal_total[0] += q * Number(result["calories"]);
		meal_total[1] += q * Number(result["total_fat"]);
		meal_total[2] += q * Number(result["protein"]);
		meal_total[3] += q * Number(result["dietary_fiber"]);

		if (result["servings"] > 0) { // can't have no servings to add a food item
			if(((meal_total[1]*100)/reqs[1] > 40 || (meal_total[0]*100)/reqs[0] > 40) && s > 0) {// why 's' here?
				if($(".add-meal-button").attr("data-target") != "#bs")
					$(".add-meal-button").attr("data-target","#popup-warn");
			} else if($(".add-meal-button").attr("data-target") != "#bs")
				$(".add-meal-button").attr("data-target","#popup-confirm");
		} else $(".add-meal-button").attr("data-target", "#bs");
	}

	// console.log(parseInt((meal_total[0]*100)/reqs[0])+"% "+
	// 		parseInt((meal_total[1]*100)/reqs[1])+"% "+
	// 		parseInt((meal_total[2]*100)/reqs[2])+"% "+
	// 		parseInt((meal_total[3]*100)/reqs[3])+"%");

	displayBar(0, "calories");
	displayBar(1, "fat");
	displayBar(2, "protein");
	displayBar(3, "fiber");
}

function displayBar(i, nutrient) {
	var reqs = [2000, 65, 50, 25];
	
	pc = Number((meal_total[i]*100)/reqs[i]);
	
	document.getElementById(nutrient).setAttribute("style", "width:"+pc+"%; min-width:2em; max-width:92%;");
	document.getElementById(nutrient).setAttribute("class", "progress-bar progress-bar-warning");
	if(pc > 99) { // check 100
		document.getElementById("outside-"+nutrient).innerHTML = "";
		document.getElementById(nutrient).innerHTML = nutrient+": "+parseInt(pc)+"%";
		document.getElementById(nutrient).setAttribute("class", "progress-bar progress-bar-danger");
	} else if(pc > 83) {
		document.getElementById("outside-"+nutrient).innerHTML = "";
		document.getElementById(nutrient).innerHTML = nutrient+": "+parseInt(pc)+"%";
	} else if(pc > 50) {
		document.getElementById(nutrient).setAttribute("style", "width:"+pc+"%; min-width:2em; max-width:83%;");
		document.getElementById("outside-"+nutrient).innerHTML = parseInt(pc)+"%";
		document.getElementById(nutrient).innerHTML = nutrient;
	} else {
		document.getElementById("outside-"+nutrient).innerHTML = nutrient;
		document.getElementById(nutrient).innerHTML = parseInt(pc)+"%";
	}
}
