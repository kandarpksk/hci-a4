function today() {
	var today = new Date();

	var dd = today.getDate();
	if(dd<10) dd='0'+dd;
	var mm = today.getMonth()+1;
	if(mm<10) mm='0'+mm;
	var yyyy = today.getFullYear();

	return(mm+'/'+dd+'/'+yyyy);
}