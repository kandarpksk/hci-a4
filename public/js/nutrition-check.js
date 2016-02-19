
// $(document).ready(function() {
// })

function info() {
	var f = document.forms["addMealForm"]["food1"].value;
	$.get("/ndata/"+f, showInfo);
}

function showInfo(result) {
	console.log(result);
	document.getElementById("overlay").innerHTML='\
	<div id="stat" class="alert alert-info" role="alert">\
		<div id="overlay" style="margin-bottom:-10px;">\
			<!-- <img alt="pic" src="https://cdn4.iconfinder.com/data/icons/food-icons/128/hamburger.png" style="width:35pt; margin-right:5pt; margin-bottom:10px"> -->\
			\
			<h4 align="left">Nutrition Information</h4>\
			\
			<div class="progress"> calories\
				<div class="progress-bar progress-bar-success" style="width: 20%"></div>\
				<div class="progress-bar progress-bar-warning" style="width: '+result["calories"]/20+'%"></div>\
			</div>\
			\
			<div class="progress">\
				<div class="progress-bar progress-bar-success" style="width: 50%">total fat</div>\
				<div class="progress-bar progress-bar-warning" style="width: '+(result["total_fat"]*5)/3+'%"></div>\
			</div>\
			\
			<div class="progress"> protein\
				<div class="progress-bar progress-bar-success" style="width: 10%"></div>\
				<div class="progress-bar progress-bar-warning" style="width: '+(result["protein"]*10)/7+'%"></div>\
			</div>\
			\
			<div class="progress"> fiber\
				<div class="progress-bar progress-bar-success" style="width: 25%"></div>\
				<div class="progress-bar progress-bar-warning" style="width: '+result["dietary_fiber"]/2+'%"></div>\
			</div>\
		</div>\
	</div>\
	<div class="caption" style="margin-top:-20px">\
		<div class="btn-group" role="group" aria-label="...">\
			<button type="button" class="btn btn-sm btn-default" onclick="pic()">Take a Pic</button>\
			<button type="button" class="btn btn-sm" onclick="info()">Nutrition Info.</button>\
		</div>\
	</div>';
}

function pic() {
	document.getElementById("overlay").innerHTML='\
	<img id="snap" class="img-responsive img-rounded"\
	src="https://d13yacurqjgara.cloudfront.net/users/1253/screenshots/1542208/flat-camera-icon.jpg" alt="..."\
	data-toggle="modal" data-target="#soon">\
	\
	<div class="caption">\
		<div class="btn-group" role="group" aria-label="...">\
			<button type="button" class="btn btn-sm" onclick="#">Take a Pic</button>\
			<button type="button" class="btn btn-sm btn-default" onclick="info()">Nutrition Info.</button>\
		</div>\
	</div>';
}
