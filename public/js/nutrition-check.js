
var meal_total = [0, 0, 0, 0];
var reqs = [2000, 65, 50, 25];

function info(where, l) {
	// console.log("called for nutritional information from: "+where+" with l="+l)
	
	meal_total = [0, 0, 0, 0];
	// console.log("reset done")
	for(i=1; i<=l; i++) {
		var f = document.forms["addMealForm"]["food"+i].value;
		if(f!="" && f!=null)
			// might need something called closures
			$.get("/data/nutrition/"+f, showInfo);
	}

	// when there is no food input yet...
}

var flag = false;
function reset() {
	meal_total = [0, 0, 0, 0];
	flag = true;
	var dummy = "dummy";
	showInfo(dummy);
}

function showInfo(result) {
	if (result != "dummy") {
		// console.log("showInfo() called for: (below)");
		// console.log(result);
	}
	if(!flag) {
		meal_total[0] += Number(result["calories"]);
		meal_total[1] += Number(result["total_fat"]);
		meal_total[2] += Number(result["protein"]);
		meal_total[3] += Number(result["dietary_fiber"]);
	}
	flag = false;

	if((meal_total[1]*100)/reqs[1] > 45)
		$("#add-meal-button").attr("data-target","#popup-warn");
	else
		$("#add-meal-button").attr("data-target","#popup-conf");

	document.getElementById("calories").setAttribute("style", "width:"+(meal_total[0]*100)/reqs[0]+"%; min-width:2em;");
	document.getElementById("calories").innerHTML = parseInt((meal_total[0]*100)/reqs[0])+"%";
	document.getElementById("total fat").setAttribute("style", "width:"+(meal_total[1]*100)/reqs[1]+"%; min-width:2em;");
	document.getElementById("total fat").innerHTML = parseInt((meal_total[1]*100)/reqs[1])+"%";
	document.getElementById("protein").setAttribute("style", "width:"+(meal_total[2]*100)/reqs[2]+"%; min-width:2em;");
	document.getElementById("protein").innerHTML = parseInt((meal_total[2]*100)/reqs[2])+"%";
	document.getElementById("fiber").setAttribute("style", "width:"+(meal_total[3]*100)/reqs[3]+"%; min-width:2em;");
	document.getElementById("fiber").innerHTML = parseInt((meal_total[3]*100)/reqs[3])+"%";
}
