
function info(where) {
	console.log("called for nutritional information from: "+where)
	
	var f = document.forms["addMealForm"]["food1"].value;
	if(f=="" || f==null)
		console.log("probably a bug: called for nutritional information with no food");
	else
		$.get("/ndata/"+f, showInfo);
	// when there is no food input yet...
}

function showInfo(result) {
	if((result["total_fat"]*5)/3 > 60)
		$("#add-meal-button").attr("data-target","#popup-warn");
	else
		$("#add-meal-button").attr("data-target","#popup-conf");

	document.getElementById("overlay").innerHTML='\
	<div id="overlay" style="margin-bottom:-10px;">\
		<!-- <img alt="pic" src="https://cdn4.iconfinder.com/data/icons/food-icons/128/hamburger.png" style="width:35pt; margin-right:5pt; margin-bottom:10px"> -->\
		\
		<h4 align="left">Nutrition Information</h4>\
		\
		<div class="progress"> calories\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+result["calories"]/20+'%"></div>\
		</div>\
		\
		<div class="progress">\
			<div class="progress-bar progress-bar-success" style="width: 0%">total fat</div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(result["total_fat"]*5)/3+'%"></div>\
		</div>\
		\
		<div class="progress"> protein\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+(result["protein"]*10)/7+'%"></div>\
		</div>\
		\
		<div class="progress"> fiber\
			<div class="progress-bar progress-bar-success" style="width: 0%"></div>\
			<div class="progress-bar progress-bar-warning" style="width: '+result["dietary_fiber"]/2+'%"></div>\
		</div>\
	</div>';
}
