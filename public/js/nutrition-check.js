
var meal_total = [0, 0, 0, 0];
var reqs = [2000, 65, 50, 25];

function info(where, l) {
	console.log("called for nutritional information from: "+where+" with l="+l)
	
	meal_total = [0, 0, 0, 0];
	console.log("reset done")
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
	var dummy;
	showInfo(dummy);
}

function showInfo(result) {
	console.log("showInfo() called for: (below)");
	console.log(result);
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

	document.getElementById("overlay").innerHTML='\
	<div id="overlay" style="margin-bottom:-10px;">\
		<!-- <img alt="pic" src="https://cdn4.iconfinder.com/data/icons/food-icons/128/hamburger.png" style="width:35pt; margin-right:5pt; margin-bottom:10px"> -->\
		\
		<h4 align="left" style="display:inline;">Nutrition Information</h4>\
		<button type="button" onClick="reset()">reset</button>\
		\
		<div class="progress"> calories\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(meal_total[0]*100)/reqs[0]+'%"></div>\
		</div>\
		\
		<div class="progress"> total fat\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(meal_total[1]*100)/reqs[1]+'%"></div>\
		</div>\
		\
		<div class="progress"> protein\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(meal_total[2]*100)/reqs[2]+'%"></div>\
		</div>\
		\
		<div class="progress"> fiber\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(meal_total[3]*100)/reqs[3]+'%"></div>\
		</div>\
	</div>';
}
