
// $(document).ready(function() {
// })

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
