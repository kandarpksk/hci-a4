
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

	updateBar(0, "calories");
	updateBar(1, "fat");
	updateBar(2, "protein");
	updateBar(3, "fiber");
}

function updateBar(i, nutrient) {
	var reqs = [2000, 65, 50, 25];
	var sshot = false; // global didn't work
	var mw = '2em';
	if(sshot) mw = '1em';
	
	var pc = Number((meal_total[i]*100)/reqs[i]);
	
	var limit, curr = parseInt(document.getElementById(nutrient+"-done").innerHTML); // learn scoping
	if(curr > 9) limit = (100-curr); else limit = 94;
	document.getElementById(nutrient).setAttribute("style", "width:"+pc+"%; min-width:"+mw+"; max-width:"+limit+"%;");
	document.getElementById(nutrient).setAttribute("class", "progress-bar progress-bar-warning");
	if(pc > 105) { // check 100
		document.getElementById("outside-"+nutrient).innerHTML = "";
		if(sshot) document.getElementById(nutrient).innerHTML = nutrient;
		else document.getElementById(nutrient).innerHTML = nutrient+": "+parseInt(pc)+"%";
		document.getElementById(nutrient).setAttribute("class", "progress-bar progress-bar-danger");
	} else if(pc > 60) { // 83
		document.getElementById("outside-"+nutrient).innerHTML = "";
		if(sshot) document.getElementById(nutrient).innerHTML = nutrient;
		else document.getElementById(nutrient).innerHTML = nutrient+": "+parseInt(pc)+"%";
	} else if(pc > 40) {
		if(curr > 9) limit = (90-curr); else limit = 83-curr;
		document.getElementById(nutrient).setAttribute("style", "width:"+pc+"%; min-width:"+mw+"; max-width:"+limit+"%;");
		if(sshot) document.getElementById("outside-"+nutrient).innerHTML = "";
		else document.getElementById("outside-"+nutrient).innerHTML = parseInt(pc)+"%";
		document.getElementById(nutrient).innerHTML = nutrient;
	} else {
		document.getElementById("outside-"+nutrient).innerHTML = nutrient;
		if(sshot) document.getElementById(nutrient).innerHTML = "";
		else document.getElementById(nutrient).innerHTML = parseInt(pc)+"%";
	}
}
