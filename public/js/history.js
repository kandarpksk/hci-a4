// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Page initialized (now in public/js/history.js)");

	/*$(".nutrients").each( function (){
		//alert($(this).text());
		console.log("oweifjsdlkfj");

	});*/

	$(".nutrition-info").each( function (){
		//Get foodname of closest ancestor td
		var foodname = $(this).closest("td").attr('class');
		$.get("/ndata/"+foodname, showInfo);



		/*
		 * Function to show nutrition info ( called from $.get() )
		 */
		function showInfo(result) {
			console.log("POOP");
			console.log(result["name"]);
			var x = document.getElementsByClassName(result["name"]);
			var selectorName = "."+result["name"];
			console.log("selectorName: " + selectorName);
			alert($(selectorName).text());
			alert($(".nutrition-info").text());


			/*$("." + result["name"]).each( function(){
				alert($(this).text());
			})
			console.log( $(this).closest("td").attr('class') );
			console.log("name: " + result["name"]);
			console.log(result["calories"]);*/
		}



	})

	console.log("eeeeeeeeee");
	var x = document.getElementById("myHeader");

	// compose the HTML
	var new_html =
		'SDLFSJELFIJSDLFKSJDLFKJ';

	/*
	// get the DIV to add content to
	var nutrition_div = $("{{date}}-{{time}}-{{food1}}");
	// add the content to the DIV
	nutrition_div.html(new_html);*/
}

